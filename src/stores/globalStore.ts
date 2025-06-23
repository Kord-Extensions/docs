import axios from "axios";
import flexver from "flexver/dist/module";
import {XMLParser} from "fast-xml-parser";

import {applyMiddleware, configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"

import {GradleMetadata, GradleVariant} from "@site/src/maven/GradleMetadata";
import {getGradleMetadata, getJSON, getMavenMetadata, getXML} from "@site/src/maven/Net";
import {MavenSnapshotMetadata} from "@site/src/maven/MavenMetadata";
import {getGradle} from "@site/src/stores/globalHooks";

const versions = await getMavenMetadata()
const latestVersion = versions[0]
const latest = await getGradleMetadata(latestVersion)

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
		versions: versions,
		retrieved: [versions[0]] as string[],

		gradle: {[latestVersion]: latest} as {[key: string] : GradleMetadata},

		status: "idle" as "idle" | "pending" | "succeeded" | "failed",
		lastError: null as string | null,
	},

	reducers: {
		clearAll: (state) => {
			state.versions = [];
			state.gradle = {} as {[key: string] : GradleMetadata};
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

export const { clearAll, setGradle, addRetrieved } = VersionSlice.actions;
export const getRetrieved = (state: RootState) => VersionSlice.selectors.getRetrieved(state);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
