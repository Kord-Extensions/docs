import URLs from "@site/src/maven/URLs";
import {MavenRootMetadata, MavenSnapshotMetadata} from "@site/src/maven/MavenMetadata";
import flexver from "flexver/dist/module";
import axios from "axios";
import {XMLParser} from "fast-xml-parser";
import {GradleMetadata} from "@site/src/maven/GradleMetadata";
import {Dependencies} from "@site/src/stores/globalStore";

export async function getJSON<T>(url: string): Promise<T> {
	const response = await axios.get(url, {responseType: "text"})

	return JSON.parse(response.data) as T
}

export async function getXML<T>(url: string): Promise<T> {
	const parser = new XMLParser()
	const response = await axios.get(url, {responseType: "text"})

	return parser.parse(response.data) as T
}

export async function getMavenMetadata(): Promise<string[]> {
	let versions = new Set<string>()

	const versionURLs = [
		URLs.kordExReleasesUrlv1("maven-metadata.xml"),
		URLs.kordExReleasesUrlv2("maven-metadata.xml"),
		URLs.kordExSnapshotUrlv1("maven-metadata.xml"),
		URLs.kordExSnapshotUrlv2("maven-metadata.xml"),
	]

	await Promise.all(versionURLs.map(url =>
		getXML<MavenRootMetadata>(url)
			.then(result => result.metadata.versioning.versions.version.map(v => versions.add(v)))
			.catch(err => console.info(`Skipping ${url}\n->`, err.message))
	));

	const array = Array.from(versions).sort(flexver).reverse()

	console.log("KordEx Versions: ", array)

	return array
}

export async function getGradleMetadata(version: string): Promise<GradleMetadata> {
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

	return await getJSON<GradleMetadata>(url);
}
