export type GradleDependency = {
	group: string,
	module: string,

	excludes?: {
		group: string,
		module: string,
	}[],

	reason?: string,
	attributes?: GradleAttributes,
	requestedCapabilities?: GradleCapabilities,
	endorseStrictVersions?: boolean,
	thirdPartyCompatibility?: {
		artifactSelector: string,
	},

	version?: {
		requires?: string,
		prefers?: string,
		strictly?: string,
		rejects?: string,
	},
}

type GradleDependencyConstraints = {
	group: string,
	module: string,

	reason?: string,
	attributes?: GradleAttributes,

	version?: {
		requires?: string,
		prefers?: string,
		strictly?: string,
		rejects?: string,
	},
}

type GradleAttributes = { [key: string]: string | boolean | number }

type GradleCapabilities = {
	group: string,
	name: string,
	version: string,
}[]

export type GradleVariant = {
	name: string,
	attributes?: GradleAttributes,
	"available-at"?: {
		url: string,
		group: string,
		module: string,
		version: string,
	},

	dependencies?: GradleDependency[],
	dependencyConstraints?: GradleDependencyConstraints[],

	files?: {
		name: string,
		url: string,
		size: number,
		sha512: string,
		sha256: string,
		sha1: string,
		md5: string,
	}[],

	capabilities?: GradleCapabilities,
}

export type GradleMetadata = {
	formatVersion: string,

	component: {
		group: string,
		module: string,
		version: string,
		url?: string,
		attributes: { [key: string]: string },
	},

	createdBy: {
		gradle?: {
			version: string,
			buildId?: string,
		},
	},

	variants: GradleVariant[]
}
