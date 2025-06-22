'use client';

import {useGlobalSelector} from "@site/src/stores/globalHooks";
import {ReactNode, useState} from "react";
import {Dependency} from "@site/src/stores/globalStore";

type DepsProps = {
	version: string
	deps: Dependency
}

function Deps(props: DepsProps) : ReactNode {
	const deps = props.deps

	const apiDeps: string[] = [];
	const runtimeDeps: string[] = [];

	const jvmVersion = deps.runtime.attributes["org.gradle.jvm.version"]

	console.log(`Version ${props.version} uses Java ${jvmVersion}`)

	return <></>
}

export default function() : ReactNode {
	const globalState = useGlobalSelector((state) => state.versions)

	const [selectedVersion, setSelectedVersion] = useState<string>(globalState.versions[0]);
	const [selectedDeps, setSelectedDeps] = useState<Dependency | undefined>(globalState.dependencies[globalState.versions[0]]);

	return <div>
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

		{
			selectedDeps === undefined ? <></> : <Deps version={selectedVersion} deps={selectedDeps} />
		}

	</div>
}
