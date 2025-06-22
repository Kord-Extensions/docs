const CENTRAL_BASE = "https://repo1.maven.org/maven2"
const KORD_SNAPSHOTS = "https://repo.kord.dev/snapshots"

const KORDEX_RELEASES = "https://releases-repo.kordex.dev"
const KORDEX_SNAPSHOTS = "https://snapshots-repo.kordex.dev"

const KORDEX_RELEASES_BASE_V1 = `${KORDEX_RELEASES}/com/kotlindiscord/kord/extensions/kord-extensions`
const KORDEX_SNAPSHOTS_BASE_V1 = `${KORDEX_SNAPSHOTS}/com/kotlindiscord/kord/extensions/kord-extensions`

const KORDEX_RELEASES_BASE_V2 = `${KORDEX_RELEASES}/dev/kordex/kord-extensions`
const KORDEX_SNAPSHOTS_BASE_V2 = `${KORDEX_SNAPSHOTS}/dev/kordex/kord-extensions`

const KORD_RELEASES_BASE = `${CENTRAL_BASE}/dev/kord/kord-core`
const KORD_SNAPSHOTS_BASE = `${KORD_SNAPSHOTS}/dev/kord/kord-core`

function kordExReleasesUrlv1(path: string) {
	return `${KORDEX_RELEASES_BASE_V1}/${path}`
}

function kordExSnapshotUrlv1(path: string) {
	return `${KORDEX_SNAPSHOTS_BASE_V1}/${path}`
}

function kordExReleasesUrlv2(path: string) {
	return `${KORDEX_RELEASES_BASE_V2}/${path}`
}

function kordExSnapshotUrlv2(path: string) {
	return `${KORDEX_SNAPSHOTS_BASE_V2}/${path}`
}

function kordReleasesUrl(path: string) {
	return `${KORD_RELEASES_BASE}/${path}`
}

function kordSnapshotUrl(path: string) {
	return `${KORD_SNAPSHOTS_BASE}/${path}`
}

export default {
	kordExReleasesUrlv1, kordExSnapshotUrlv1,
	kordExReleasesUrlv2, kordExSnapshotUrlv2,
	kordReleasesUrl, kordSnapshotUrl,
}
