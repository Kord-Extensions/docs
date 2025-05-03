import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import {Tag, Tags} from "../Tags";

// region: Common

type CommonProps = {
	className?: string | null,
}

// endregion

// region: Containers

type ArgumentsProps = {
	type?: "function" | "lambda"
} & CommonProps

function toTitleCase(str: string): string {
	return str.replace(
		/\w\S*/g,
		function (txt: string) {
			return txt.charAt(0).toUpperCase() +
				txt.substring(1).toLowerCase();
		}
	);
}

export function Arguments(props: PropsWithChildren<ArgumentsProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.args, "doc-arguments")}>
			<div className={clsx(styles.headMed, "mb-0.5")}>
				{
					props.type === undefined ? "" : `${toTitleCase(props.type)}`
				} Arguments
			</div>

			<div className={clsx(styles.indent, styles.col)}>
				{props.children}
			</div>
		</div>
	);
}

type ContainerProps = {} & CommonProps

export function Container(props: PropsWithChildren<ContainerProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.container, "doc-container")}>
			{props.children}
		</div>
	);
}

// endregion

// region: Items

type ArgProps = {
	name: string,
	type: string,
	default?: string,
} & CommonProps

export function Arg(props: PropsWithChildren<ArgProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.arg, "doc-argument")}>
			<div className={clsx(styles.row)} style={{marginBottom: "0.25em"}}>
				<Tags>
					<code className={clsx(styles.headMed, "shadow--lw")}>{props.name}</code>

					<Tag style="primary">
						<span>Type:</span> <code className="shadow--lw">{props.type}</code>
					</Tag>

					{
						props.default === undefined ? <></> :
							<Tag style="success">
								<span>Default:</span> <code className="shadow--lw">{props.default}</code>
							</Tag>
					}
				</Tags>
			</div>

			<div className={clsx(styles.indent)}>
				{props.children}
			</div>
		</div>
	);
}

type BuilderProps = {
	name: string,
	hasArgs?: boolean,
	returns?: string,
	receiver?: string,
} & CommonProps

export function Builder(props: PropsWithChildren<BuilderProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, "doc-builder")}>
			<div className={clsx(styles.row)}>
				<Tags>
					<code className={
						clsx(styles.head, "shadow--lw")}>{props.name}{props.hasArgs ? "(...)" : ""} {"{ ... }"
					}</code>

					{
						props.receiver == undefined ? <></> :
							<Tag style="warning">
								Receiver: <code className="shadow--lw">{props.receiver}</code>
							</Tag>
					}

					{
						props.returns == undefined ? <></> :
							<Tag style="info">
								Returns: <code className="shadow--lw">{props.returns}</code>
							</Tag>
					}
				</Tags>
			</div>

			<div className={clsx(styles.indent)}>
				{props.children}
			</div>
		</div>
	);
}

type FunctionProps = {
	name: string,
	receiver?: string,
	returns?: string,
} & CommonProps

export function Function(props: PropsWithChildren<FunctionProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, "doc-function")}>
			<div className={clsx(styles.row)}>
				<Tags>
					<code className={clsx(styles.head, "shadow--lw")}>{props.name}(...)</code>

					{
						props.receiver == undefined ? <></> :
							<Tag style="warning">
								Receiver: <code className="shadow--lw">{props.receiver}</code>
							</Tag>
					}

					{
						props.returns == undefined ? <></> :
							<Tag style="info">
								Returns: <code className="shadow--lw">{props.returns}</code>
							</Tag>
					}
				</Tags>
			</div>

			<div className={clsx(styles.indent)}>
				{props.children}
			</div>
		</div>
	);
}

type PropertyProps = {
	name: string,
	type: string,
	default?: string,
} & CommonProps

export function Property(props: PropsWithChildren<PropertyProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, "doc-property")}>
			<div className={clsx(styles.row)}>
				<Tags>
					<code className={clsx(styles.head, "shadow--lw")}>{props.name}</code>

					<Tag style="primary">
						Type: <code className="shadow--lw">{props.type}</code>
					</Tag>

					{
						props.default == undefined ? <></> :
							<Tag style="success">
								Default: <code className="shadow--lw">{props.default}</code>
							</Tag>
					}
				</Tags>
			</div>

			<div className={clsx(styles.indent)}>
				{props.children}
			</div>
		</div>
	);
}

// endregion
