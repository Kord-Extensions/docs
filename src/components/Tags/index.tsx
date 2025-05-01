import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";

type ContainerProps = {
	withHeaders?: boolean,
	inline?: boolean,
	left?: boolean,
	right?: boolean,
	grow?: boolean,
}

type TagProps = {
	style?: "primary" | "danger" | "info" | "success" | "warning",
}

function propsToClasses(props: ContainerProps): string {
	return clsx(
		"tags",
		props.withHeaders ? "with-headers" : null,
		props.inline ? "inline" : null,
		props.left ? "left" : null,
		props.right ? "right" : null,
		props.grow ? "grow" : null,
	)
}

export function Tag(props: PropsWithChildren<TagProps>): ReactNode {
	return <span className={clsx("tag", props.style)}>
		{props.children}
	</span>
}

export function Tags(props : PropsWithChildren<ContainerProps>): ReactNode {
	return (
		<div className={propsToClasses(props satisfies ContainerProps)}>
			{props.children}
		</div>
	)
}
