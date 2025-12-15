"use client";

import CodeBlock from '@theme/CodeBlock';
import {ReactNode} from "react";
import {getVersion} from "@site/src/versions/functions";
import WaitForVersions from "@site/src/components/WaitForVersions";

// THIS IS ANNOYING, BUT BY FUCK, IT WORKS!

export function VersionCatalogue() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="toml">
{`[versions]
kord-extensions = "${getVersion("kordEx")}"

[libraries]
kord-extensions-core = { module = "dev.kordex:kord-extensions", version.ref = "kord-extensions" }
kord-extensions-ap = { module = "dev.kordex:annotation-processor", version.ref = "kord-extensions" }
`}
			</CodeBlock>
		)}
	/>
}

export function BuildGroovy() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="groovy">
{`plugins {
  id "org.jetbrains.kotlin.jvm" version "${getVersion("kotlin")}"
  id "org.jetbrains.kotlin.plugin.serialization" version "${getVersion("kotlin")}"

  id "com.google.devtools.ksp" version "${getVersion("ksp")}"
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
{`plugins {
  kotlin("jvm") version "${getVersion("kotlin")}"
  kotlin("plugin.serialization") version "${getVersion("kotlin")}"

  id("com.google.devtools.ksp") version "${getVersion("ksp")}"
}
`}
			</CodeBlock>
		)}
	/>
}

export function MavenPom() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="xml">
{`<repositories>
  <!-- ... -->

  <repository>
    <id>kordex-snapshots-r2</id>
    <name>KordEx (Snapshots, R2)</name>
    <url>https://snapshots-repo.kordex.dev</url>
  </repository>

  <repository>
    <id>kordex-releases-r2</id>
    <name>KordEx (Releases, R2)</name>
    <url>https://releases-repo.kordex.dev</url>
  </repository>

  <repository>
    <id>kordex-snapshots-reposilite</id>
    <name>KordEx (Snapshots + Mirror, Reposilite)</name>
    <url>https://repo.kordex.dev/snapshots</url>
  </repository>

  <repository>
    <id>kordex-mirror-r2</id>
    <name>KordEx (Mirror, R2)</name>
    <url>https://mirror-repo.kordex.dev</url>
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
		)}
	/>
}

export function BuildSBT() : ReactNode {
	return <WaitForVersions
		callback={() => (
			<CodeBlock language="scala">
{`enablePlugins(KotlinPlugin)

kotlinLib("stdlib")
kotlinPlugin("serialization")

kotlinVersion := "${getVersion("kotlin")}"
kotlincJvmTarget := "${getVersion("java")}"

resolvers += "KordEx (Snapshots, R2)" at "https://snapshots-repo.kordex.dev"
resolvers += "KordEx (Releases, R2)" at "https://releases-repo.kordex.dev"
resolvers += "KordEx (Snapshots + Mirror, Reposilite)" at "https://repo.kordex.dev/snapshots"
resolvers += "Kord (Mirror, R2)" at "https://mirror-repo.kordex.dev"

libraryDependencies ++= Seq(
  "dev.kordex" % "kord-extensions" % "${getVersion("kordEx")}"
)
`}
			</CodeBlock>
		)}
	/>
}
