import {useDispatch, useSelector, useStore} from "react-redux"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getGradleMetadata} from "@site/src/maven/Net"

import {
	addRetrieved,
	AppDispatch,
	getRetrieved,
	RootState,
	Store,
	VersionedGradleMetadata
} from "./globalStore"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useGlobalDispatch = useDispatch.withTypes<AppDispatch>()
export const useGlobalSelector = useSelector.withTypes<RootState>()
export const useGlobalStore = useStore.withTypes<typeof Store>()

export const getGradle = createAsyncThunk(
	"versions/getMavenMetadata",

	async (version: string, thunkAPI) => {
		addRetrieved(version)

		return {
			version: version,
			metadata: await getGradleMetadata(version),
		} as VersionedGradleMetadata
	}, {
		condition(version, thunkApi) {
			thunkApi.getState()

			const retrieved = getRetrieved(thunkApi.getState() as RootState)

			if (retrieved.includes(version)) {
				return false
			}
		}
	}
)
