import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GradleMetadata, GradleVariant, VersionCatalogue} from "@site/src/maven/GradleMetadata";

import {
	getGradleMetadata,
	getGradleVersion,
	getI18nVersions,
	getMavenMetadata,
	getPluginVersions,
	getVersionCatalogue
} from "@site/src/maven/Net";

import {getGradle} from "@site/src/stores/globalHooks";

export type Dependency = {
	api: GradleVariant,
	runtime: GradleVariant,
}

export type Dependencies = {
	[key: string]: Dependency
}

export interface VersionedGradleMetadata {
	version: string,
	metadata: GradleMetadata,
}

export const VersionSlice = createSlice({
	name: "versions",

	initialState: {
		configured: false,
		gradleVersion: "Unknown",

		versionCatalogue: {} as VersionCatalogue,
		versions: [] as string[],
		pluginVersions: [] as string[],
		i18nVersions: [] as string[],
		retrieved: [] as string[],

		gradle: {} as { [key: string]: GradleMetadata },

		status: "idle" as "idle" | "pending",
		lastError: null as string | null,
	},

	reducers: {
		clearAll: (state) => {
			state.versions = [];
			state.gradle = {} as { [key: string]: GradleMetadata };
		},

		markConfigured: (state) => {
			state.configured = true
		},

		replaceGradle: {
			reducer(state, action: PayloadAction<{ [key: string]: GradleMetadata }>) {
				state.gradle = action.payload;
			},

			prepare(version: string, data: GradleMetadata) {
				return {payload: {[version]: data}}
			}
		},

		replaceVersionCatalogue: {
			reducer(state, action: PayloadAction<VersionCatalogue>) {
				state.versionCatalogue = action.payload;
			},

			prepare(data: VersionCatalogue) {
				return {payload: data}
			}
		},

		replaceVersions: {
			reducer(state, action: PayloadAction<string[]>) {
				state.versions = action.payload;
			},

			prepare(data: string[]) {
				return {payload: data}
			}
		},

		replacePluginVersions: {
			reducer(state, action: PayloadAction<string[]>) {
				state.pluginVersions = action.payload;
			},

			prepare(data: string[]) {
				return {payload: data}
			}
		},

		replaceI18nVersions: {
			reducer(state, action: PayloadAction<string[]>) {
				state.i18nVersions = action.payload;
			},

			prepare(data: string[]) {
				return {payload: data}
			}
		},

		setGradle: {
			reducer(state, action: PayloadAction<VersionedGradleMetadata>) {
				state.gradle[action.payload.version] = action.payload.metadata;
			},

			prepare(version: string, metadata: GradleMetadata) {
				return {payload: {version, metadata}};
			}
		},

		setGradleVersion: {
			reducer(state, action: PayloadAction<string>) {
				state.gradleVersion = action.payload;
			},

			prepare(version: string) {
				return {payload: version};
			}
		},

		addRetrieved: {
			reducer(state, action: PayloadAction<string>) {
				state.retrieved.push(action.payload)
			},

			prepare(version: string) {
				return {payload: version}
			}
		},
	},

	selectors: {
		getRetrieved: sliceState => sliceState.retrieved
	},

	extraReducers: builder => {
		builder
			.addCase(getGradle.pending, (state, action) => {
				state.status = "pending"
				state.lastError = null
			})

			.addCase(getGradle.fulfilled, (state, action) => {
				state.status = "idle"
				state.gradle[action.payload.version] = action.payload.metadata
			})

			.addCase(getGradle.rejected, (state, action) => {
				state.status = "idle"
				state.lastError = action.error.message ?? "Unknown error"
			})
	}
})

export const Store = configureStore({
	reducer: {
		versions: VersionSlice.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
})

export const {
	addRetrieved,
	clearAll,
	markConfigured,
	replaceGradle,
	replaceI18nVersions,
	replacePluginVersions,
	replaceVersionCatalogue,
	replaceVersions,
	setGradle,
	setGradleVersion,
} = VersionSlice.actions;

export const getRetrieved = (state: RootState) => VersionSlice.selectors.getRetrieved(state);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

// NOTE: Must be done this way instead of using a top-level await.
// Docusaurus will fail to build with a cryptic error otherwise.
function setup() {
	async function inner() {
		console.log("Setting up initial data...")

		const mavenVersions = await getMavenMetadata()
		const latestVersion = mavenVersions[0]

		Store.dispatch(addRetrieved(latestVersion))
		Store.dispatch(replaceVersions(mavenVersions))

		console.log(`Latest KordEx version: ${latestVersion}`)
		console.log("All KordEx versions:", mavenVersions.join(", "))

		await Promise.all([
			(async () => {
				const pluginVersions = await getPluginVersions()
				const latestPluginVersion = pluginVersions[0]

				Store.dispatch(replacePluginVersions(pluginVersions))

				console.log(`Latest Gradle plugin version: ${latestPluginVersion}`)
				console.log("Gradle plugin versions:", pluginVersions.join(", "))
			})(),

			(async () => {
				const i18nVersions = await getI18nVersions()
				const latestI18nVersion = i18nVersions[0]

				Store.dispatch(replaceI18nVersions(i18nVersions))

				console.log(`Latest i18n framework version: ${latestI18nVersion}`)
				console.log("I18n framework versions:", i18nVersions.join(", "))
			})(),

			(async () => {
				const gradleVersion = await getGradleVersion()

				Store.dispatch(setGradleVersion(gradleVersion))

				console.log("Latest plugin's expected Gradle version:", gradleVersion)
			})(),

			(async () => {
				const versionCatalogue = await getVersionCatalogue()

				Store.dispatch(replaceVersionCatalogue(versionCatalogue))
			})(),

			(async () => {
				const gradleMetadata = await getGradleMetadata(latestVersion)

				Store.dispatch(replaceGradle(latestVersion, gradleMetadata))
			})(),
		])

		Store.dispatch(markConfigured())

		console.log("Initial data ready!")
	}

	inner().then()
}

setup()
