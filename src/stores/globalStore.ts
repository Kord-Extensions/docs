import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {GradleMetadata, GradleVariant} from "@site/src/maven/GradleMetadata";
import {getGradleMetadata, getMavenMetadata} from "@site/src/maven/Net";
import {getGradle, useGlobalDispatch} from "@site/src/stores/globalHooks";
import {useDispatch} from "react-redux";

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
		versions: [] as string[],
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

		replaceVersions: {
			reducer(state, action: PayloadAction<string[]>) {
				state.versions = action.payload;
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

export const {clearAll, setGradle, addRetrieved, replaceGradle, replaceVersions, markConfigured} = VersionSlice.actions;
export const getRetrieved = (state: RootState) => VersionSlice.selectors.getRetrieved(state);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

// This replaces a top-level await.
// Let's avoid using await here as well.
function setup() {
	console.log("Setting up initial data...")

	getMavenMetadata().then(
		(v) => {
			console.log("KordEx Versions:", v)

			const latestVersion = v[0];

			addRetrieved(latestVersion)

			getGradleMetadata(latestVersion).then(
				(g) => {
					console.log(`Latest version: ${latestVersion}`)

					Store.dispatch(replaceVersions(v))
					Store.dispatch(replaceGradle(latestVersion, g))
					Store.dispatch(markConfigured())
				}
			)
		}
	)
}

setup()
