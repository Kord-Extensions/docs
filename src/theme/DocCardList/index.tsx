import React, {type ReactNode} from "react";
import clsx from "clsx";
import {filterDocCardListItems, useCurrentSidebarCategory,} from "@docusaurus/plugin-content-docs/client";
import DocCard from "@theme/DocCard";
import type {Props} from "@theme/DocCardList";
import {PropSidebarItem} from "@docusaurus/plugin-content-docs/lib/sidebars/types";

type GroupedItems = {
	[key: string]: PropSidebarItem[]
}

function DocCardListForCurrentSidebarCategory({className}: Props) {
	const category = useCurrentSidebarCategory();

	return <DocCardList items={category.items} className={className}/>;
}

export default function DocCardList(props: Props): ReactNode {
	const {items, className} = props;

	if (!items) {
		return <DocCardListForCurrentSidebarCategory {...props} />;
	}

	let groupedItems: Map<string, PropSidebarItem[]> = new Map()

	groupedItems.set("", []);

	filterDocCardListItems(items)
		.forEach((item: PropSidebarItem) => {
			if (item.customProps["card_group"] === undefined) {
				groupedItems.get("").push(item)
			} else {
				const group = item.customProps["card_group"] as string

				if (groupedItems.get(group) === undefined) {
					groupedItems.set(group, [])
				}

				groupedItems.get(group).push(item)
			}
		});

	const elements = Array.from(groupedItems).map(([key, items]) => {
		return <>
			<h2 style={{marginTop: "1rem"}}>{key}</h2>

			<section className={clsx("row", className)}>
				{items.map((item, index) => (
					<article key={index} className="col col--6 margin-bottom--lg">
						<DocCard item={item}/>
					</article>
				))}
			</section>
		</>
	})

	return <>
		{
			elements
		}
	</>
}
