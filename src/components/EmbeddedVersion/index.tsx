import {ReactNode, useEffect, useState} from "react";
import {getGradle, useGlobalDispatch, useGlobalSelector} from "@site/src/stores/globalHooks";
import {GradleMetadata, GradleVariant} from "@site/src/maven/GradleMetadata";
import Loader from "@site/src/components/Loader";

const predefined: {
	[key: string]: (metadata: GradleMetadata, api: GradleVariant, runtime: GradleVariant) =>
		string | number | boolean | undefined
} = {
	java: (metadata, api, runtime) => (runtime.attributes["org.gradle.jvm.version"]),

	kotlin: (metadata, api, runtime) => (
		runtime.dependencyConstraints?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires ?? api.dependencyConstraints?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires ?? runtime.dependencies?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires ?? api.dependencies?.find(
			(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
		)?.version?.requires
	),

	kord: (metadata, api, runtime) => (
		runtime.dependencies?.find(
			(it) => (it.group === "dev.kord" && it.module.startsWith("kord-core"))
		)?.version?.requires
	),

	kordEx: (metadata, api, runtime) => (
		metadata.component.version
	),

	core: (metadata, api, runtime) => (
		metadata.component.version
	)
}

type EmbeddedVersionProps = {
	reference: string;
	code?: boolean,
}

function Inner(props: EmbeddedVersionProps): ReactNode {
	const versions = useGlobalSelector((state) => state.versions.versions)
	const gradleModules = useGlobalSelector((state) => state.versions.gradle)
	const gradle = gradleModules[versions[0]]

	let versionNumber: ReactNode;

	const deps = {
		api: gradle.variants.find((it) => (it.name === "apiElements")),
		runtime: gradle.variants.find((it) => (it.name === "runtimeElements")),
	}

	if (predefined.hasOwnProperty(props.reference)) {
		versionNumber = (predefined[props.reference](gradle, deps.api, deps.runtime) ?? "Unknown") + ""
	} else if (props.reference.indexOf(":") > -1) {
		const [refGroup, refModule] = props.reference.split(":")

		versionNumber =
		deps.api?.dependencies.find(
				(it) => (it.group === refGroup && it.module === refModule)
			)?.version?.requires ??
			deps.runtime?.dependencies.find(
				(it) => (it.group === refGroup && it.module === refModule)
			)?.version?.requires ?? "Unknown"
	} else {
		throw new Error(
			`Reference "${props.reference}" doesn't contain a colon, and isn't one of: ${Object.keys(predefined).join(", ")}`
		)
	}

	return <>
		{
			props.code === true ?
				<code>{versionNumber}</code> :
				versionNumber
		}
	</>
}

export default function (props: EmbeddedVersionProps): ReactNode {
	const isConfigured = useGlobalSelector((state) => state.versions.configured)

	return <>
		{
			!isConfigured ?
				<Loader /> :
				<Inner {...props} />
		}
	</>
}
