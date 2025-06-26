export type MavenRootMetadata = {
	metadata: {
		artifactId: string,
		groupId: string,
		version?: string,
		versioning: {
			lastUpdated: number,
			latest: string,
			release?: string,

			versions: {
				version: string[],
			}
		}
	}
}

export type MavenSnapshotMetadata = {
	metadata: {
		artifactId: string,
		groupId: string,
		version: string,

		versioning: {
			lastUpdated: number,

			snapshot: {
				buildNumber: number,
				timestamp: number
			},

			snapshotVersions: {
				snapshotVersion: {
					extension: string,
					value: string,
					updated: number,
					classifier?: string,
				}[],
			}
		}
	}
}
