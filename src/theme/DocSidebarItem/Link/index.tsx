import React, {type ReactNode} from "react";
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";
import {isActiveSidebarItem} from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import type {Props} from "@theme/DocSidebarItem/Link";

import {Tooltip} from "react-tooltip"
import {Icon} from "@iconify/react";

import styles from "./styles.module.css";

function processTags({item}: Props): ReactNode {
	const tags: ReactNode[] = [];

	if (!item.customProps || !item.customProps["tags"]) {
		return <></>;
	}

	item.customProps.tags.forEach((tag: string) => {
		if (tag === "wip") {
			tags.push(
				<Icon
					data-tooltip-id="wip-tooltip"
					fontSize="1.25em"
					icon="lucide:hourglass" color="var(--discord-red)"
				/>
			);
		} else if (tag.startsWith("v-")) {
			let version = tag.split("-", 2)[1];

			if (!version.includes(".")) {
				version = `${version}.x`
			}

			tags.push(
				<span
					data-tooltip-id="generic-tooltip"
					data-tooltip-content={`New in version ${version}`}
					data-tooltip-place="left"
					className={"text-info"}
				>
					{version}
				</span>
			);
		} else {
			throw new Error(`Unknown tag: ${tag}`);
		}
	})

	return <span className={"tags grow inline right"}>
		<span style={{flexGrow: 1}}/>

		{tags.map(tag => tag)}
	</span>;
}

export default function DocSidebarItemLink(
	{item, onItemClick, activePath, level, index, ...props}: Props
): ReactNode {
	const {href, label, className, autoAddBaseUrl} = item;
	const isActive = isActiveSidebarItem(item, activePath);
	const isInternalLink = isInternalUrl(href);

	return (
		<li
			className={clsx(
				ThemeClassNames.docs.docSidebarItemLink,
				ThemeClassNames.docs.docSidebarItemLinkLevel(level),
				"menu__list-item",
				className,
			)}

			key={`${level} ${label}`}
		>
			<Link
				className={clsx(
					"menu__link",
					!isInternalLink && styles.menuExternalLink,
					{
						"menu__link--active": isActive,
					},
				)}

				autoAddBaseUrl={autoAddBaseUrl}
				aria-current={isActive ? "page" : undefined}
				to={href}

				{...(isInternalLink && {
					onClick: onItemClick ? () => onItemClick(item) : undefined,
				})}

				{...props}
			>
				<span style={{height: "1.3em", whiteSpace: "nowrap", maxWidth: "90%", overflowY: "visible", overflowX: "auto"}}>{label}</span>
				{processTags({item})}
				{!isInternalLink && <IconExternalLink/>}
			</Link>
		</li>
	);
}
