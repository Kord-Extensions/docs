import React, {PropsWithChildren, ReactNode} from "react";

import styles from "./styles.module.css"
import clsx, {ClassValue} from "clsx";

type Props = {
	style?: React.CSSProperties,
	className?: ClassValue | ClassValue[],
}

export function Row(props: PropsWithChildren<Props>): ReactNode {
	return <div className={clsx(styles.row, props.className)} style={props.style}>
		{props.children}
	</div>
}

export function FixedRow(props: PropsWithChildren<Props>): ReactNode {
	return <div className={clsx(styles.fixedRow, props.className)} style={props.style}>
		{props.children}
	</div>
}

export function Column(props: PropsWithChildren<Props>): ReactNode {
	return <div className={clsx(styles.col, props.className)} style={props.style}>
		{props.children}
	</div>
}
