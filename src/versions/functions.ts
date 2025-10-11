"use client";

import {Store} from "@site/src/stores/globalStore";

import {GradleMetadata, GradleVariant} from "@site/src/maven/GradleMetadata";

const predefined: {
	[key: string]: (metadata?: GradleMetadata, api?: GradleVariant, runtime?: GradleVariant) =>
		string | number | boolean | undefined
} = {
	java: (metadata, api, runtime) => (runtime?.attributes["org.gradle.jvm.version"]),

	kotlin: (metadata, api, runtime) => (
		runtime?.dependencyConstraints?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires ?? api?.dependencyConstraints?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires ?? runtime?.dependencies?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires ?? api?.dependencies?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires
	),

	kord: (metadata, api, runtime) => (
		runtime?.dependencies?.find(
			(it) => (it.group === "dev.kord" && it.module.startsWith("kord-core"))
		)?.version?.requires
	),

	kordEx: (metadata, api, runtime) => (
		metadata?.component?.version
	),

	core: (metadata, api, runtime) => (
		metadata?.component?.version
	)
}

export function getVersion(reference: string): string {
	const state = Store.getState().versions

	if (!state.configured) {
		return "(Called too early — wrap with the <WaitForVersions> component!)"
	}

	const versions = state.versions
	const pluginVersions = state.pluginVersions
	const gradleModules = state.gradle
	const gradleVersion = state.gradleVersion
	const i18nVersions = state.i18nVersions
	const versionCatalogue = state.versionCatalogue

	const gradle = gradleModules[versions[0]]

	let versionNumber: string;

	const deps = {
		api: gradle?.variants?.find((it) => (it.name === "apiElements")),
		runtime: gradle?.variants?.find((it) => (it.name === "runtimeElements")),
	}

	if (reference === "plugin") {
		versionNumber = pluginVersions[0]
	} else if (reference === "gradle") {
		versionNumber = gradleVersion
	}  else if (reference === "i18n") {
		versionNumber = i18nVersions[0]
	} else if (predefined.hasOwnProperty(reference)) {
		versionNumber = (predefined[reference](gradle, deps.api, deps.runtime) ?? "Unknown") + ""
	} else if (versionCatalogue.versions.hasOwnProperty(reference)) {
		versionNumber = versionCatalogue.versions[reference]
	} else if (reference.indexOf(":") > -1) {
		const [refGroup, refModule] = reference.split(":")

		versionNumber =
			deps.api?.dependencies.find(
				(it) => (it.group === refGroup && it.module === refModule)
			)?.version?.requires ??
			deps.runtime?.dependencies.find(
				(it) => (it.group === refGroup && it.module === refModule)
			)?.version?.requires ?? "Unknown"
	} else {
		throw new Error(
			`Reference "${reference}" doesn't contain a colon, and isn't one of: plugin, ${Object.keys(predefined).join(", ")}`
		)
	}

	return versionNumber
}
