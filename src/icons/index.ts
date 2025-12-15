import {loadIcons} from "@iconify/react";

export const Icons = {
	close: "mdi:close-circle",
	checkPositive: "fa-solid:equals",
	checkNegative: "fa-solid:not-equal",
	copyDefault: "fluent:clipboard-text-ltr-24-filled",
	copyClicked: "fluent:checkmark-circle-24-regular",
	dependencyApi: "fluent:box-24-filled",
	dependencyRuntime: "fluent:play-circle-hint-24-regular",
}

export function loadSiteIcons() {
	loadIcons(
		Object.values(Icons),

		(loaded, missing, pending, unsubscribe) => {
			if (loaded.length) {
				console.log(`Icons loaded: ${loaded.map((it) => `${it.prefix}:${it.name}`).join(", ")}`)
			}

			if (missing.length) {
				console.log(`Icons missing: ${missing.map((it) => `${it.prefix}:${it.name}`).join(", ")}`)
			}

			if (pending.length) {
				console.log(`Icons pending: ${pending.map((it) => `${it.prefix}:${it.name}`).join(", ")}`)
			}
		}
	)
}
