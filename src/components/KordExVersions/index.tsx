"use client";

import React, {ReactNode, useState} from "react";
import clsx from "clsx";

import {Icon} from "@iconify/react";

import {getGradle, useGlobalDispatch, useGlobalSelector} from "@site/src/stores/globalHooks";
import {Tag, Tags} from "@site/src/components/Tags";

import styles from "./styles.module.css";
import {GradleMetadata} from "@site/src/maven/GradleMetadata";
import Loader from "@site/src/components/Loader";
import {FixedRow, Row} from "@site/src/components/Layout";
import {Copyable} from "@site/src/components/Copyable";

type MetadataProps = {
	version: string
	metadata: GradleMetadata
}

type FlattenedDep = {
	id: string,
	group: string,
	module: string,
	onlyRequires: boolean,

	version: {
		requires?: string,
		prefers?: string,
		strictly?: string,
		rejects?: string,
	}
}

function Metadata(props: MetadataProps): ReactNode {
	const deps = {
		api: props.metadata.variants.find((it) => (it.name === "apiElements")),
		runtime: props.metadata.variants.find((it) => (it.name === "runtimeElements")),
	}

	const jvmVersion = deps.runtime.attributes["org.gradle.jvm.version"] as number;

	const kotlinVersion: string | undefined = deps.runtime.dependencyConstraints?.find(
		(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
	)?.version?.requires ?? deps.api.dependencyConstraints?.find(
		(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
	)?.version?.requires ?? deps.runtime.dependencies?.find(
		(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
	)?.version?.requires ?? deps.api.dependencies?.find(
		(it) => (it.group === "org.jetbrains.kotlin" && it.module === "kotlin-stdlib-jdk8")
	)?.version?.requires

	const apiDeps: { [key: string]: FlattenedDep } = {};
	const runtimeDeps: { [key: string]: FlattenedDep } = {};

	for (const it of deps.api.dependencies) {
		if (it.version === undefined) {
			continue;
		}

		const key = `${it.group}:${it.module}`
		let onlyRequires = false;

		if (it.version.requires !== undefined) {
			onlyRequires = true
		}

		if (
			it.version.prefers !== undefined ||
			it.version.rejects !== undefined ||
			it.version.strictly !== undefined
		) {
			onlyRequires = false
		}

		apiDeps[key] = {
			id: key,
			group: it.group,
			module: it.module,
			version: it.version,

			onlyRequires,
		}
	}

	for (const it of deps.runtime.dependencies) {
		if (it.version === undefined) {
			continue;
		}

		const key = `${it.group}:${it.module}`
		let onlyRequires = false;

		if (it.version.requires !== undefined) {
			onlyRequires = true
		}

		if (
			it.version.prefers !== undefined ||
			it.version.rejects !== undefined ||
			it.version.strictly !== undefined
		) {
			onlyRequires = false
		}

		if (key in apiDeps) {
			continue
		}

		runtimeDeps[key] = {
			id: key,
			group: it.group,
			module: it.module,
			version: it.version,

			onlyRequires,
		}
	}

	const allDeps = Object.keys(apiDeps).concat(Object.keys(runtimeDeps)).sort()

	const elements = allDeps.map(item => {
		let dep: FlattenedDep;
		let isApiDep: boolean;

		if (item in apiDeps) {
			dep = apiDeps[item];
			isApiDep = true;
		} else {
			dep = runtimeDeps[item];
			isApiDep = false;
		}
		let clipboardText = `${dep.group}:${dep.module}`

		if (dep.onlyRequires) {
			clipboardText += `:${dep.version.requires}`
		}

		return <Tags key={`${item}-row`}>
			<Row className="fullwidth-mobile">
				<FixedRow>
					<Copyable content={clipboardText} prompt="Copy Coordinates"/>

					{
						isApiDep ?
							<FixedRow>
								<Icon icon="fluent:box-24-filled" className="text-primary"
								      style={{alignSelf: "center"}} fontSize="25px"
								      data-tooltip-id="api-dependency-tooltip"
								      key={`${item}-icon`}
								/>

								<span className="hide-desktop text-success">
									API Dependency
								</span>
							</FixedRow> :
							<FixedRow>
								<Icon icon="fluent:play-circle-hint-24-regular" className="text-info"
								      style={{alignSelf: "center"}} fontSize="25px"
								      data-tooltip-id="runtime-dependency-tooltip"
								      key={`${item}-icon`}
								/>

								<span className="hide-desktop text-danger">
									Runtime Dependency
								</span>
							</FixedRow>
					}
				</FixedRow>

				<code className={clsx("shadow--lw", "fullwidth-mobile scroll-mobile nowrap-mobile")} key={`${item}-dep-string`}>
					{dep.group}:{dep.module}
					{
						dep.onlyRequires ? `:${dep.version.requires}` : ""
					}
				</code>

			</Row>

			{
				dep.onlyRequires ?
					<></> :
					<>
						{
							dep.version.prefers !== undefined ?
								<Tag style="info"
								     key={`${item}-prefers`}
								>
									Prefers: <code>{dep.version.prefers}</code>
								</Tag> :
								<></>
						}
						{
							dep.version.rejects !== undefined ?
								<Tag style="danger"
								     key={`${item}-rejects`}
								>
									Rejects: <code>{dep.version.rejects}</code>
								</Tag> :
								<></>
						}
						{
							dep.version.requires !== undefined ?
								<Tag style="info"
								     key={`${item}-requires`}
								>
									Requires: <code>{dep.version.requires}</code>
								</Tag> :
								<></>
						}
						{
							dep.version.strictly !== undefined ?
								<Tag style="warning"
								     key={`${item}-strictly`}
								>
									Strictly: <code>{dep.version.strictly}</code>
								</Tag> :
								<></>
						}
					</>
			}
		</Tags>
	})

	return <div className="mt-1">
		<h2>Dependencies</h2>

		{jvmVersion !== undefined || kotlinVersion !== undefined ? <Tags className="mb-1">
			{kotlinVersion !== undefined ? <Tag style="primary">Kotlin: <code>{kotlinVersion}</code></Tag> : <></>}
			{jvmVersion !== undefined ? <Tag style="warning">Java: <code>{jvmVersion}</code></Tag> : <></>}
		</Tags> : <></>}

		<Tags>

		</Tags>

		<div className={clsx(styles.col)}>
			{elements.map((element) => (element))}
		</div>
	</div>
}

function Inner(): ReactNode {
	const globalState = useGlobalSelector((state) => state.versions)
	const dispatch = useGlobalDispatch();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedVersion, setSelectedVersion] = useState<string>(globalState.versions[0]);
	const [selectedMetadata, setSelectedMetadata] = useState<GradleMetadata | null>(
		globalState.gradle[globalState.versions[0] ?? null]
	);

	function getMetadata(version: string) {
		if (!globalState.gradle.hasOwnProperty(version)) {
			console.log(`Loading version: ${version}`)

			setIsLoading(true);

			dispatch(getGradle(version)).then((data) => {
				if (data.payload !== undefined) {
					setSelectedMetadata((data.payload as { metadata: GradleMetadata }).metadata)
				} else {
					setSelectedMetadata(null)
				}

				setIsLoading(false);

				console.log(`Loading done.`)
			})
		} else {
			console.log(`Using existing data for version: ${version}`)

			setSelectedMetadata(globalState.gradle[version])
		}
	}

	return <div>
		<div className={clsx(styles.row)}>
			<div className={clsx(styles.menu, (isLoading || globalState.versions.length < 1) ? styles.disabled : "")}>
				<select value={selectedVersion}
				        disabled={isLoading || globalState.versions.length < 1}

				        onChange={e => {
					        setSelectedVersion(e.target.value)
					        getMetadata(e.target.value)
				        }}
				>
					{
						globalState.versions.map((v) => (
							<option key={v} value={v}>{v}</option>
						))
					}
				</select>

				<span className={clsx(styles.focus)}></span>
			</div>

			{isLoading ? <Loader size="2em" style={{alignSelf: "center"}}/> : null}
		</div>

		{
			globalState.versions.length < 1 ?
				<div className="text-danger mt-1">Can't load Kord Extensions versions from Maven!</div> :
				selectedMetadata === null || selectedMetadata === undefined ?
					<div className="text-danger mt-1">
						Can't fetch metadata for
						version {selectedVersion}: {globalState.lastError ?? "Metadata file missing"}.
					</div> :
					<div className={clsx(styles.darkener, isLoading ? styles.darken : "")}>
						<Metadata version={selectedVersion} metadata={selectedMetadata}/>
					</div>
		}
	</div>
}

export default function (): ReactNode {
	const isConfigured = useGlobalSelector((state) => state.versions.configured)

	return <>
		{isConfigured ? <Inner/> : <div className="text-primary mt-1">Please wait, loading versions...</div>}
	</>
}
