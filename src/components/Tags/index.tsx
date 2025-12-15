import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import {Tooltip} from "react-tooltip"

type ContainerProps = {
	withHeaders?: boolean,
	inline?: boolean,
	left?: boolean,
	right?: boolean,
	grow?: boolean,
	className?: string | string[],
}

type TagProps = {
	style?: "primary" | "secondary" | "danger" | "info" | "success" | "warning",
	title?: string,
	className?: string | string[],
	tooltip?: string,
}

function propsToClasses(props: ContainerProps): string {
	return clsx(
		"tags",
		props.withHeaders ? "with-headers" : null,
		props.inline ? "inline" : null,
		props.left ? "left" : null,
		props.right ? "right" : null,
		props.grow ? "grow" : null,
		props.className,
	)
}

export function Tag(props: PropsWithChildren<TagProps>): ReactNode {
	return <span
		className={clsx("tag", "shadow--lw", props.style ?? "normal", props.className)}
		title={props.title}
		data-tooltip-id={props.tooltip}
	>
		{props.children}
	</span>
}

export function Tags(props: PropsWithChildren<ContainerProps>): ReactNode {
	return (
		<div className={propsToClasses(props satisfies ContainerProps)}>
			{props.children}
		</div>
	)
}
