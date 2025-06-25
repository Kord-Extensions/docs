import React, {ReactNode} from "react";
import styles from "./style.module.css"
import Loader from "./loader.svg"

type LoaderProps = {
	colorVar?: string
	size?: string
	style?: React.CSSProperties
}

export default function (props: LoaderProps): ReactNode {
	let colorVar: string;

	if (props.colorVar !== undefined && props.colorVar !== null) {
		colorVar = props.colorVar;
	} else {
		colorVar = "--ifm-font-color-base"
	}

	let size: string;

	if (props.size !== undefined && props.size !== null) {
		size = props.size;
	} else {
		size = "1em"
	}

	return <Loader style={{
		...props.style,

		color: `var(${colorVar})`,
		height: size,
		verticalAlign: "middle",
		display: "inline-block"
	}} />
}
