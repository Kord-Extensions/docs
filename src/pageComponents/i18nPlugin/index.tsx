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
    id("dev.kordex.gradle.i18n") version "${getVersion("i18n")}"
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

	implementation("dev.kordex.gradle.i18n", "dev.kordex.gradle.i18n.gradle.plugin", "${getVersion("i18n")}")
}`}
			</CodeBlock>
		)}
	/>
}
