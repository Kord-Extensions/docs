"use client";

import styles from "./styles.module.css"
import clsx from "clsx";

import {PropsWithChildren, ReactNode} from "react";
import {Icon} from "@iconify/react";
import {Column, Row} from "@site/src/components/Layout";

// region Components

export function MessageContainer(props: PropsWithChildren): ReactNode {
	return <Column className={clsx(styles.message)}>
		{props.children}
	</Column>
}

export function Message(props: PropsWithChildren) {
	return <Column>
		<Row>
			<div className={clsx(styles.avatar)}>
				<img src="/img/logo.png" alt="Avatar"/>
			</div>

			<Column style={{gap: 0}}>
				<Row>
					<span className={clsx(styles.userName)}>KordEx Testing</span>
					<span className={clsx(styles.userTag)}>APP</span>
					<span className={clsx(styles.timestamp)}>10:30</span>
				</Row>

				{props.children}
			</Column>
		</Row>
	</Column>
}

export function ActionRow(props: PropsWithChildren) {
	return <Row className={clsx(styles.actionRow)}>
		{props.children}
	</Row>
}

type ButtonProps = {
	style: "primary" | "secondary" | "success" | "danger" | "link" | "premium" | "disabled"
	label: string
}

export function Button(props: ButtonProps) {
	let style: string;

	let startIcon: ReactNode | undefined = undefined;
	let endIcon: ReactNode | undefined = undefined;

	switch (props.style) {
		case "primary":
			style = clsx(styles.button, styles.primary)
			break;

		case "secondary":
			style = clsx(styles.button, styles.secondary)
			break;

		case "success":
			style = clsx(styles.button, styles.success)
			break;

		case "danger":
			style = clsx(styles.button, styles.danger)
			break;

		case "disabled":
			style = clsx(styles.button, styles.disabled)
			break;

		case "link":
			style = clsx(styles.button, styles.link)
			endIcon = <Icon icon="fluent-mdl2:navigate-external-inline"/>
			break;

		case "premium":
			style = clsx(styles.button, styles.premium)
			startIcon = <Icon icon="fluent:building-shop-24-filled"/>
			break;
	}

	return <div className={style}>
		{startIcon}
		{props.label}
		{endIcon}
	</div>
}

type SelectMenuProps = {
	label: string,
} & PropsWithChildren

export function SelectMenu(props: SelectMenuProps) {
	return <Row className={clsx(styles.menu)}>
		<span>{props.label}</span>
		<span style={{flexGrow: 1}}>&nbsp;</span>
		<Icon icon="fluent:chevron-down-24-filled"></Icon>
	</Row>
}

// endregion
