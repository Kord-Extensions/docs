"use client";

import CodeBlock from '@theme/CodeBlock';
import {ReactNode} from "react";
import {getVersion} from "@site/src/versions/functions";
import WaitForVersions from "@site/src/components/WaitForVersions";

// THIS IS ANNOYING, BUT BY FUCK, IT WORKS!

export function PluginBlock() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="kotlin">
{`plugins {
    id("dev.kordex.gradle.kordex") version "${getVersion("plugin")}"
}`}
			</CodeBlock>
		)}
	/>
}

export function ConventionDependency() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="kotlin">
{`dependencies {
	// ...

	implementation("dev.kordex.gradle.kordex", "dev.kordex.gradle.kordex.gradle.plugin", "${getVersion("plugin")}")
}`}
			</CodeBlock>
		)}
	/>
}
