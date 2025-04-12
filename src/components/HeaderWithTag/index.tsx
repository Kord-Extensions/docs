import {createElement, PropsWithChildren, ReactNode} from "react";

type props = {
	style: string,
	text: string,
}

export default function Header({children, style, text} : PropsWithChildren<props>): ReactNode {
	return (
		<div className={"header-tags-container markdown"}>
			<span className={`header-tag ${style}`}>{text}</span>

			{children}
		</div>
	)
}
