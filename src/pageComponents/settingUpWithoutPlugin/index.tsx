"use client";

import CodeBlock from '@theme/CodeBlock';
import {ReactNode} from "react";
import {getVersion} from "@site/src/versions/functions";
import WaitForVersions from "@site/src/components/WaitForVersions";

// THIS IS ANNOYING, BUT BY FUCK, IT WORKS!

export function VersionCatalogue() : ReactNode {
	return <WaitForVersions>
		<CodeBlock language="toml">
		{`[versions]
kord-extensions = "${getVersion("kordEx")}"

[libraries]
kord-extensions-core = { module = "dev.kordex:kord-extensions", version.ref = "kord-extensions" }
kord-extensions-ap = { module = "dev.kordex:annotation-processor", version.ref = "kord-extensions" }
`}
		</CodeBlock>
	</WaitForVersions>
}

export function BuildGroovy() : ReactNode {
	return <WaitForVersions>
		<CodeBlock language="groovy">
		{`plugins {
  id "org.jetbrains.kotlin.jvm" version "${getVersion("kotlin")}"
  id "org.jetbrains.kotlin.plugin.serialization" version "${getVersion("kotlin")}"

  id "com.google.devtools.ksp" version "${getVersion("ksp")}"
}
`}
		</CodeBlock>
	</WaitForVersions>
}

export function BuildKTS() : ReactNode {
	return <WaitForVersions>
		<CodeBlock language="kotlin">
		{`plugins {
  kotlin("jvm") version "${getVersion("kotlin")}"
  kotlin("plugin.serialization") version "${getVersion("kotlin")}"

  id("com.google.devtools.ksp") version "${getVersion("ksp")}"
}
`}
		</CodeBlock>
	</WaitForVersions>
}

export function MavenPom() : ReactNode {
	return <WaitForVersions>
		<CodeBlock language="xml">
		{`<repositories>
  <!-- ... -->

  <repository>
    <id>kordex-snapshots</id>
    <name>KordEx (Snapshots)</name>
    <url>https://snapshots-repo.kordex.dev</url>
  </repository>

  <repository>
    <id>kordex-releases</id>
    <name>KordEx (Releases)</name>
    <url>https://releases-repo.kordex.dev</url>
  </repository>

  <repository>
    <id>sonatype-snapshots-legacy</id>
    <name>Kord (Snapshots)</name>
    <url>https://repo.kord.dev/snapshots/</url>
  </repository>
</repositories>

<dependencies>
  <!-- ... -->

  <dependency>
    <groupId>dev.kordex</groupId>
    <artifactId>kord-extensions</artifactId>
    <version>${getVersion("kordEx")}</version>
  </dependency>
</dependencies>
`}
		</CodeBlock>
	</WaitForVersions>
}

export function BuildSBT() : ReactNode {
	return <WaitForVersions>
		<CodeBlock language="scala">
		{`enablePlugins(KotlinPlugin)

kotlinLib("stdlib")
kotlinPlugin("serialization")

kotlinVersion := "${getVersion("kotlin")}"
kotlincJvmTarget := "${getVersion("java")}"

resolvers += "KordEx (Snapshots)" at "https://snapshots-repo.kordex.dev"
resolvers += "KordEx (Releases)" at "https://releases-repo.kordex.dev"
resolvers += "Kord (Snapshots)" at "https://repo.kord.dev/snapshots/"

libraryDependencies ++= Seq(
  "dev.kordex" % "kord-extensions" % "${getVersion("kordEx")}"
)
`}
		</CodeBlock>
	</WaitForVersions>
}
