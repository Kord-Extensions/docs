"use client";

import CodeBlock from '@theme/CodeBlock';
import {ReactNode} from "react";
import {getVersion} from "@site/src/versions/functions";
import WaitForVersions from "@site/src/components/WaitForVersions";
import {useGlobalSelector} from "@site/src/stores/globalHooks";
import Loader from "@site/src/components/Loader";

// THIS IS ANNOYING, BUT BY FUCK, IT WORKS!

export function BuildGroovy() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="groovy">
{`// ...

kordEx {
  kordExVersion = "${getVersion("kordEx")}"

  bot {
    // Data collection level, change this if desired.
    dataCollection(DataCollection.Standard)

    // Replace this with the coordinates to your bot's actual main class.
    mainClass = "my.package.MyBotKt"
  }
}
`}
			</CodeBlock>
		)}
	/>
}

export function SettingsGroovy() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="groovy">
{`plugins {
  id "org.jetbrains.kotlin.jvm" version "${getVersion("kotlin")}"
  id "org.jetbrains.kotlin.plugin.serialization" version "${getVersion("kotlin")}"

  id "com.google.devtools.ksp" version "${getVersion("ksp")}"
  id "dev.kordex.gradle.kordex" version "${getVersion("plugin")}"
}
`}
			</CodeBlock>
		)}
	/>
}

export function BuildKTS() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="kotlin">
{`// ...

kordEx {
  kordExVersion = "${getVersion("kordEx")}"

  bot {
    // Data collection level, change this if desired.
    dataCollection(DataCollection.Standard)

    // Replace this with the coordinates to your bot's actual main class.
    mainClass = "my.package.MyBotKt"
  }
}
`}
			</CodeBlock>
		)}
	/>
}

export function SettingsKTS() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="kotlin">
{`plugins {
  kotlin("jvm") version "${getVersion("kotlin")}"
  kotlin("plugin.serialization") version "${getVersion("kotlin")}"

  id("com.google.devtools.ksp") version "${getVersion("ksp")}"
  id("dev.kordex.gradle.kordex") version "${getVersion("plugin")}"
}
`}
			</CodeBlock>
		)}
	/>
}
