import React, {type ReactNode} from "react";
import DocSidebarItemCategory from "@theme/DocSidebarItem/Category";
import DocSidebarItemLink from "@theme/DocSidebarItem/Link";
import DocSidebarItemHtml from "@theme/DocSidebarItem/Html";
import type {Props} from "@theme/DocSidebarItem";
import clsx from "clsx";

export default function DocSidebarItem({item, ...props}: Props): ReactNode {
	let classes: string | undefined = item.className || ""

	if (item.customProps && item.customProps["hidden"]) {
		return <></>
	}

	if (item.customProps && item.customProps["divider_above"]) {
		classes = clsx(classes, "menu__list-item-divider-above_" + props.index)
	}

	if (item.customProps && item.customProps["divider_below"]) {
		classes = clsx(classes, "menu__list-item-divider-below_" + props.index)
	}

	item.className = classes

	switch (item.type) {
		case "category":
			return <DocSidebarItemCategory item={item} {...props} />;

		case "html":
			return <DocSidebarItemHtml item={item} {...props} />;

		case "link":
		default:
			return <DocSidebarItemLink item={item} {...props} />;
	}
}
