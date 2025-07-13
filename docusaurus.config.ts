import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import { rehypeExtendedTable } from "rehype-extended-table";

const rmkPlugins = []
const rhpPlugins = [
	[rehypeExtendedTable, {}]
]

const config: Config = {
	title: "Kord Extensions Docs",
	tagline: "Everything you need to know about our projects.",
	favicon: "img/logo.png",

	url: "https://docs.kordex.dev",
	baseUrl: "/",

	organizationName: "Kord-Extensions",
	projectName: "docs",

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	clientModules: [
		"src/icons/client.ts"
	],

	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	presets: [
		[
			"classic",
			{
				docs: {
					id: "bots",
					path: "bots",
					routeBasePath: "bots",
					sidebarPath: "./bots-sidebars.ts",

					rehypePlugins: rhpPlugins,
					remarkPlugins: rmkPlugins,

					tags: "../src/tags.yml",
					onInlineTags: "throw",
				},

				theme: {
					customCss: "./src/css/custom.css",
				},

				svgr: {},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "i18n",
				path: "i18n",
				routeBasePath: "i18n",
				sidebarPath: "./i18n-sidebars.ts",

				rehypePlugins: rhpPlugins,
				remarkPlugins: rmkPlugins,

				tags: "../src/tags.yml",
				onInlineTags: "throw",
			}
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "about",
				path: "about",
				routeBasePath: "about",
				sidebarPath: "./about-sidebars.ts",

				rehypePlugins: rhpPlugins,
				remarkPlugins: rmkPlugins,

				tags: "../src/tags.yml",
				onInlineTags: "throw",
			}
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "misc",
				path: "misc",
				routeBasePath: "misc",
				sidebarPath: "./misc-sidebars.ts",

				rehypePlugins: rhpPlugins,
				remarkPlugins: rmkPlugins,

				tags: "../src/tags.yml",
				onInlineTags: "throw",
			}
		],
	],

	themeConfig: {
		image: "img/social-card.png",

		tableOfContents: {
			maxHeadingLevel: 4,
		},

		colorMode: {
			disableSwitch: false,
			respectPrefersColorScheme: true,
		},

		algolia: {
			appId: "M02COLVI8J",
			apiKey: "588814eabdec644a7039452755b4b621",
			indexName: "kordex",
		},

		prism: {
			// Note: Must add "java" for "scala" to work.
			additionalLanguages: ["bash", "toml", "groovy", "java", "scala", "markup"],

			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},

		navbar: {
			title: "Kord Extensions",

			logo: {
				alt: "Kord Extensions Logo",
				src: "img/logo.svg",
			},

			items: [
				{
					to: "/about",
					position: "left",
					label: "About",
				},

				{
					to: "/bots",
					position: "left",
					label: "Bots",
				},

				{
					to: "/i18n",
					position: "left",
					label: "i18n",
				},

				{
					to: "/misc",
					position: "left",
					label: "Misc.",
				},
			],
		},

		footer: {
			style: "dark",

			links: [
				{
					title: "Community",

					items: [
						{
							label: "Discord",
							href: "https://discord.gg/nYzQWcjAmK",
						},
						{
							label: "GitHub",
							href: "https://github.com/orgs/Kord-Extensions/discussions",
						},
					],
				},

				{
					title: "Links",

					items: [
						{
							label: "Website",
							href: "https://kordex.dev",
						},

						{
							label: "Donate",
							href: "https://donate.stripe.com/3csg29aPp95Rgxi7ss?client_reference_id=docs",
						},

						{
							label: "Translate",
							href: "https://hosted.weblate.org/engage/kord-extensions/",
						},
					],
				},
			],

			copyright: `⚖️ Creative Commons Zero Licence`,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
