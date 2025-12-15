import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";

type props = {
	style?: "primary" | "danger" | "info" | "success" | "warning",
	text: string,
}

export default function Header(props : PropsWithChildren<props>): ReactNode {
	return (
		<div className={"tags with-headers no-gap mb-1 markdown"}>
			<span className={clsx("tag", props.style)}>{props.text}</span>

			{props.children}
		</div>
	)
}
