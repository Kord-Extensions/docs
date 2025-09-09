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

type ModalProps = {
	title: string
} & PropsWithChildren;

export function Modal(props: ModalProps) {
	return <Column className={clsx(styles.modal)}>
		<Row className={clsx(styles.modalHeader)}>
			<img src="/img/logo.png" alt="Avatar"/>
			<span style={{flexGrow: 1}}>{props.title}</span>
			<span>
				<Icon icon="fluent-mdl2:chrome-close" fontSize="0.75em" style={{color: "var(--discord-close)"}} />
			</span>
		</Row>

		<Row className={clsx(styles.modalWarning)}>
			<Icon className={clsx(styles.icon)} icon="fluent:error-circle-24-filled" />

			<div>
				This form will be submitted to <strong>KordEx Testing</strong>.
				Do not share passwords or other sensitive information.
			</div>
		</Row>

		<Column style={{gap: "1em", flexGrow: 1}}>
			{props.children}
		</Column>
	</Column>
}

export function ActionRow(props: PropsWithChildren) {
	return <Row className={clsx(styles.actionRow)}>
		{props.children}
	</Row>
}

type ModalRowProps = {
	label: string
	required?: boolean
	description?: string
} & PropsWithChildren

export function ModalRow(props: ModalRowProps) {
	let required: boolean = props.required ?? false;

	return <Column style={{gap: "0.25em"}} className={clsx(styles.modalRow)}>
		<Row className={clsx(styles.modalRowHeader)}>
			{props.label}
			{required ? <span style={{color: "var(--discord-red)"}}>*</span> : undefined}
		</Row>

		{
			props.description === undefined ?
				undefined :
				<span>{props.description}</span>
		}

		<Row className={clsx(styles.actionRow)}>
			{props.children}
		</Row>
	</Column>
}

type ButtonProps = {
	style: "primary" | "secondary" | "success" | "danger" | "link" | "premium" | "disabled" | "cutout"
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

		case "cutout":
			style = clsx(styles.button, styles.cutout)
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

type LineInputProps = {
	label: string,
} & PropsWithChildren

export function LineInput(props: LineInputProps) {
	return <Row className={clsx(styles.menu)}>
		<span>{props.label}</span>
		<span style={{flexGrow: 1}}>&nbsp;</span>
	</Row>
}

type ParagraphInputProps = {
	label: string,
} & PropsWithChildren

export function ParagraphInput(props: ParagraphInputProps) {
	return <Column className={clsx(styles.paragraph)}>
		<span>{props.label}</span>
		<span style={{flexGrow: 1}}>&nbsp;</span>
	</Column>
}

// endregion
