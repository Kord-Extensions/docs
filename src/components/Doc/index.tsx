import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import {Icon} from '@iconify/react';
import { Tooltip } from 'react-tooltip'

import {Tag, Tags} from "../Tags";

// region: Common

type CommonProps = {
	className?: string | null,
}

function Internal(): ReactNode {
	return (
		<div style={{display: "flex", alignItems: "center"}} data-tooltip-id="internal-api-tooltip">
			<Icon icon="fluent:warning-20-filled" height="2.5em" className="text-warning"></Icon>
		</div>
	)
}

// endregion

// region: Containers

type ArgumentsProps = {
	type?: "function" | "lambda" | "type"
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
				}
				{
					props.type === "type" ? " Parameters" : " Arguments"
				}
			</div>

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent, styles.col)}>
					{props.children}
				</div>
			}
		</div>
	);
}

type ContainerProps = {
	internal?: boolean
} & CommonProps

function ContainerWrapper(props: PropsWithChildren<ContainerProps>): ReactNode {
	if (props.internal) {
		return <details className={styles.details}>
			<summary className={styles.detailsSummary}>
				Show/Hide Internal APIs
			</summary>

			{props.children}
		</details>
	} else {
		return props.children
	}
}

export function Container(props: PropsWithChildren<ContainerProps>): ReactNode {
	return (
		<ContainerWrapper {...props}>
			<div className={clsx(props.className, styles.container, "doc-container")}>
				{props.children}
			</div>
		</ContainerWrapper>
	);
}

// endregion

// region: Items

type ArgProps = {
	name: string,
	type?: string | string[] | undefined,
	supportsCollections?: boolean,
	default?: string,
	internal?: boolean,
} & CommonProps

export function Arg(props: PropsWithChildren<ArgProps>): ReactNode {
	let firstType: string | String | undefined = undefined;

	const hasMultipleTypes = !(
		props.type == undefined ||
		typeof (props.type) === "string" ||
		props.type instanceof String ||
		props.type.length === 1
	)

	if (typeof (props.type) === "string" || props.type instanceof String) {
		firstType = props.type;
	} else if (props.type !== undefined) {
		firstType = props.type[0]
	}

	return (
		<div className={clsx(props.className, styles.arg, "doc-argument")}>
			<div className={clsx(styles.row)} style={{marginBottom: "0.25em"}}>
				<Tags>
					{props.internal ? <Internal /> : <></>}

					<code className={clsx(styles.headMed, "shadow--lw")}>{props.name}</code>

					{
						props.type === undefined ? <></> :

							<Tag style="primary">
								{typeof (props.type) === "string" ?
									<>
										<span>Type:</span> <code className="shadow--lw">{props.type}</code>
									</> :
									<>
										<span>Types:</span>

										{props.type.map((overload) => (
											<code className="shadow--lw">
												{overload}
											</code>
										))}

										{props.supportsCollections === true ?
											<>
												{hasMultipleTypes ?
													<>
														&amp;
														<code className="shadow--lw">
															Collection&lt;T&gt;
														</code>
													</> :
													<code className="shadow--lw">
														Collection&lt;{firstType}&gt;
													</code>
												}
											</> :
											<></>
										}
									</>
								}
							</Tag>
					}

					{
						props.default === undefined ? <></> :
							<Tag style="success">
								<span>Default:</span> <code className="shadow--lw">{props.default}</code>
							</Tag>
					}
				</Tags>
			</div>

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent)}>
					{props.children}
				</div>
			}
		</div>
	);
}

type BuilderProps = {
	name: string,
	hasArgs?: boolean,
	functionReturns?: string,
	lambdaReturns?: string,
	receiver?: string,
	internal?: boolean,
} & CommonProps

export function Builder(props: PropsWithChildren<BuilderProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-builder")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal /> : <></>}

					<code className={
						clsx(styles.head, "shadow--lw")}>{props.name}
						<span className="text-secondary">
							{props.hasArgs ? "(...)" : ""}
							{props.hasArgs ? " { ... }" : <>&nbsp;{"{ ... }"}</>}
						</span>
					</code>

					{
						props.receiver == undefined ? <></> :
							<Tag style="warning">
								Receiver: <code className="shadow--lw">{props.receiver}</code>
							</Tag>
					}

					{
						props.functionReturns == undefined ? <></> :
							<Tag style="info">
								Function Returns: <code className="shadow--lw">{props.functionReturns}</code>
							</Tag>
					}

					{
						props.lambdaReturns == undefined ? <></> :
							<Tag style="info">
								Lambda Returns: <code className="shadow--lw">{props.lambdaReturns}</code>
							</Tag>
					}
				</Tags>
			</div>

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent)}>
					{props.children}
				</div>
			}
		</div>
	);
}

type FunctionProps = {
	name: string,
	receiver?: string,
	returns?: string,
	default?: boolean,
	suspend?: boolean,
	open?: boolean,
	abstract?: boolean,
	internal?: boolean,
} & CommonProps

export function Function(props: PropsWithChildren<FunctionProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-function")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal /> : <></>}

					<code className={clsx(styles.head, "shadow--lw")}>
						{
							props.abstract !== true ? <></> :
								<span className="text-info">abstract&nbsp;</span>
						}

						{
							props.open !== true ? <></> :
								<span className="text-info">open&nbsp;</span>
						}

						{
							props.suspend !== true ? <></> :
								<span className="text-info">suspend&nbsp;</span>
						}

						{props.name}<span className="text-secondary">(...)</span>
					</code>

					{
						props.default !== true ? <></> :
							<Tag style="secondary">
								Default
							</Tag>
					}

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

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent)}>
					{props.children}
				</div>
			}
		</div>
	);
}

type PropertyProps = {
	name: string,
	type: string,
	abstract?: boolean,
	open?: boolean,
	default?: string,
	internal?: boolean,
} & CommonProps

export function Property(props: PropsWithChildren<PropertyProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-property")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal /> : <></>}

					<code className={clsx(styles.head, "shadow--lw")}>
						{
							props.abstract !== true ? <></> :
								<span className="text-info">abstract&nbsp;</span>
						}

						{
							props.open !== true ? <></> :
								<span className="text-info">open&nbsp;</span>
						}

						{props.name}
					</code>

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

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent)}>
					{props.children}
				</div>
			}
		</div>
	);
}

type TypeProps = {
	name: string,
	type: "abstract class" | "class" | "data class" | "enum class" | "interface" | "typealias",
	sealed?: boolean,
	open?: boolean,
	internal?: boolean,
} & CommonProps

export function Type(props: PropsWithChildren<TypeProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-type")}>
			<div className={clsx(styles.row)} style={{marginBottom: "0.25em"}}>
				<Tags>
					{props.internal ? <Internal /> : <></>}

					<code className={clsx(styles.head, "shadow--lw")}>
						{
							props.sealed === true ?
								<span className="text-danger">
									sealed&nbsp;
								</span> :
								<></>
						}

						{
							props.open === true ?
								<span className="text-success">
									open&nbsp;
								</span> :
								<></>
						}

						<span className="text-info">
							{props.type}
						</span>
						&nbsp;{props.name}
					</code>
				</Tags>
			</div>

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent)}>
					{props.children}
				</div>
			}
		</div>
	);
}

// endregion
