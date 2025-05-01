import React, {type ReactNode} from "react";
import clsx from "clsx";
import {filterDocCardListItems, useCurrentSidebarCategory,} from "@docusaurus/plugin-content-docs/client";
import DocCard from "@theme/DocCard";
import type {Props} from "@theme/DocCardList";
import {PropSidebarItem} from "@docusaurus/plugin-content-docs/lib/sidebars/types";

type CustomProps = Props & {
	readonly items?: PropSidebarItem[];
	readonly className?: string;
	readonly descriptions?: { [key: string]: string } | undefined;
}

function DocCardListForCurrentSidebarCategory({className, descriptions}: CustomProps) {
	const category = useCurrentSidebarCategory();

	return <DocCardList items={category.items} className={className} descriptions={descriptions}/>;
}

export function DocCardListWithDescriptions(props: CustomProps): ReactNode {
	return DocCardList(props)
}

export default function DocCardList(props: CustomProps): ReactNode {
	console.log(props)

	const {items, className} = props;

	let descriptions: { [key: string]: string }

	if ("descriptions" in props && props.descriptions !== undefined) {
		descriptions = props.descriptions
	} else {
		descriptions = {}
	}

	if (!items) {
		return <DocCardListForCurrentSidebarCategory {...props} />;
	}

	let groupedItems: Map<string, PropSidebarItem[]> = new Map()
	let defaultGroup: PropSidebarItem[] = []

	filterDocCardListItems(items)
		.forEach((item: PropSidebarItem) => {
			if (item.customProps === undefined || item.customProps["card_group"] === undefined) {
				defaultGroup.push(item)
			} else {
				const group = item.customProps["card_group"] as string

				if (groupedItems.get(group) === undefined) {
					groupedItems.set(group, [])
				}

				groupedItems.get(group).push(item)
			}
		});

	function alphaSortString(a: string, b: string) {
		return a.localeCompare(b)
	}

	function alphaSortPair(a: [string, PropSidebarItem[]], b: [string, PropSidebarItem[]]) {
		return a[0].localeCompare(b[0])
	}

	function alphaSortItem(a: PropSidebarItem, b: PropSidebarItem) {
		return alphaSortString(a.label, b.label)
	}

	const elements = Array
		.from(groupedItems)
		.sort(alphaSortPair)
		.map(([key, items]) => {
			return <>
				<h2
					style={{
						marginTop: "1rem",
						marginBottom: descriptions[key] === undefined ? "1rem" : "0",
					}}>{key}</h2>

				{
					descriptions[key] === undefined ? <></> :
						<p
							style={{
								paddingLeft: "0.1rem", marginBottom: "1rem"
							}}>{descriptions[key]}</p>
				}

				<section className={clsx("row", className)} style={{paddingBottom: "0"}}>
					{items.sort(alphaSortItem).map((item, index) => (
						<article key={index} className="col col--6 margin-bottom--lg">
							<DocCard item={item}/>
						</article>
					))}
				</section>
			</>
		})

	elements.push(
		// Only create the "Others" section if the default group has items.
		defaultGroup.length === 0 ? <></> :
			<>
				<h2 style={{marginTop: "1rem"}}>Others</h2>

				<section className={clsx("row", className)}>
					{defaultGroup.sort(alphaSortItem).map((item, index) => (
						<article key={`default-${index}`} className="col col--6 margin-bottom--lg">
							<DocCard item={item}/>
						</article>
					))}
				</section>
			</>
	)

	return <>{elements}</>
}
