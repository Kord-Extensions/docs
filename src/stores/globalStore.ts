import flexver from "flexver";

import axios from "axios";
import {XMLParser} from "fast-xml-parser";
import {configureStore, createSlice} from "@reduxjs/toolkit";

import URLs from "@site/src/maven/URLs";
import {MavenRootMetadata, MavenSnapshotMetadata} from "@site/src/maven/MavenMetadata";
import {GradleMetadata, GradleVariant} from "@site/src/maven/GradleMetadata";

const versions = await getMavenMetadata()
const deps = await getDependencies(versions)

export type Dependency = {
	api: GradleVariant,
	runtime: GradleVariant,
}

export type Dependencies = {
	[key: string]: Dependency
}

export const VersionSlice = createSlice({
	name: "versions",
	initialState: {
		versions: versions,
		dependencies: deps,
	},

	reducers: {
		// Note: Reducers aren't useful for this state, we preload it and that's all.
		// Still, TypeScript requires we have at least one.
		clear: (state) => {
			state.versions = [];
			state.dependencies = {};
		}
	}
})

export const Store = configureStore({
	reducer: {
		versions: VersionSlice.reducer,
	},
})

export const {clear} = VersionSlice.actions;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

async function getJSON<T>(url: string): Promise<T> {
	const response = await axios.get(url, {responseType: "text"})

	return JSON.parse(response.data) as T
}

async function getXML<T>(url: string): Promise<T> {
	const parser = new XMLParser()
	const response = await axios.get(url, {responseType: "text"})

	return parser.parse(response.data) as T
}

async function getDependencies(versions: string[]): Promise<Dependencies> {
	const result: Dependencies = {}

	for (const version of versions) {
		let url: string;

		if (version.startsWith("1.") || version.startsWith("0.")) {
			if (version.endsWith("-SNAPSHOT")) {
				let mavenMetadata = await getXML<MavenSnapshotMetadata>(
					URLs.kordExSnapshotUrlv1(`${version}/maven-metadata.xml`)
				)

				let versions = mavenMetadata.metadata.versioning.snapshotVersions.snapshotVersion.sort(
					(left, right) => (left.updated - right.updated)
				).reverse()

				let latest = versions[0].value

				url = URLs.kordExSnapshotUrlv1(`${version}/kord-extensions-${latest}.module`)
			} else {
				url = URLs.kordExReleasesUrlv1(`${version}/kord-extensions-${version}.module`)
			}
		} else {
			if (version.endsWith("-SNAPSHOT")) {
				let mavenMetadata = await getXML<MavenSnapshotMetadata>(
					URLs.kordExSnapshotUrlv2(`${version}/maven-metadata.xml`)
				)

				let versions = mavenMetadata.metadata.versioning.snapshotVersions.snapshotVersion.sort(
					(left, right) => (left.updated - right.updated)
				).reverse()

				let latest = versions[0].value

				url = URLs.kordExSnapshotUrlv2(`${version}/kord-extensions-${latest}.module`)
			} else {
				url = URLs.kordExReleasesUrlv2(`${version}/kord-extensions-${version}.module`)
			}
		}

		try {
			let metadata = await getJSON<GradleMetadata>(url);

			result[version] = {
				api: metadata.variants.find(
					(v) => (v.name == "apiElements")
				),

				runtime: metadata.variants.find(
					(v) => (v.name == "runtimeElements")
				),
			}
		} catch (e) {
			console.error(`Failed to get metadata for KordEx ${version}`, e)
		}
	}

	return result
}

async function getMavenMetadata(): Promise<string[]> {
	let versions = new Set<string>()

	const versionURLs = [
		URLs.kordExReleasesUrlv1("maven-metadata.xml"),
		URLs.kordExReleasesUrlv2("maven-metadata.xml"),
		URLs.kordExSnapshotUrlv1("maven-metadata.xml"),
		URLs.kordExSnapshotUrlv2("maven-metadata.xml"),
	]

	for (const url of versionURLs) {
		try {
			let result: MavenRootMetadata = await getXML<MavenRootMetadata>(url)

			result.metadata.versioning.versions.version.forEach(
				(version) => {
					versions.add(version)
				}
			)
		} catch (e) {
			console.info(`Skipping ${url}`, e)
		}
	}
	const array = Array.from(versions).sort(flexver).reverse()

	console.log("KordEx Versions: ", array)

	return array
}
