"use client";

import {ReactNode, useState} from "react";
import clsx from "clsx";

import {Icon} from "@iconify/react";

import {useGlobalSelector} from "@site/src/stores/globalHooks";
import {Dependency} from "@site/src/stores/globalStore";
import {Tag, Tags} from "@site/src/components/Tags";

import styles from "./styles.module.css";

type DepsProps = {
	version: string
	deps: Dependency
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

function Deps(props: DepsProps): ReactNode {
	const deps = props.deps

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
			<Icon icon="fluent:clipboard-text-ltr-24-filled"
			      style={{alignSelf: "center", cursor: "pointer"}} fontSize="25px"
			      data-tooltip-id="copy-dependency-tooltip"
			      key={`${item}-copy-icon`}
			      onClick={e => {
				      e.preventDefault();

				      navigator.clipboard.writeText(clipboardText).then(() => {
				      })
			      }}
			/>

			{
				isApiDep ?
					<Icon icon="fluent:box-24-filled" className="text-primary"
					      style={{alignSelf: "center"}} fontSize="25px"
					      data-tooltip-id="api-dependency-tooltip"
					      key={`${item}-icon`}
					/> :
					<Icon icon="fluent:play-circle-hint-24-regular" className="text-info"
					      style={{alignSelf: "center"}} fontSize="25px"
					      data-tooltip-id="runtime-dependency-tooltip"
					      key={`${item}-icon`}
					/>
			}

			<code className={clsx("shadow--lw")} key={`${item}-dep-string`}>
				{dep.group}:{dep.module}
				{
					dep.onlyRequires ? `:${dep.version.requires}` : ""
				}
			</code>

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

export default function (): ReactNode {
	const globalState = useGlobalSelector((state) => state.versions)

	const [selectedVersion, setSelectedVersion] = useState<string>(globalState.versions[0]);
	const [selectedDeps, setSelectedDeps] = useState<Dependency | undefined>(globalState.dependencies[globalState.versions[0]]);

	return <div>
		<div className={clsx(styles.menu)}>
			<select value={selectedVersion}
			        onChange={e => {
				        setSelectedVersion(e.target.value)
				        setSelectedDeps(globalState.dependencies[e.target.value])
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

		{
			selectedDeps === undefined ?
				<div className="text-danger mt-1">Unable to retrieve metadata for version {selectedVersion}.</div> :
				<Deps version={selectedVersion} deps={selectedDeps}/>
		}

	</div>
}
