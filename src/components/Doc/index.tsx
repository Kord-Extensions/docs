import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import {Icon} from "@iconify/react";
import {Tooltip} from "react-tooltip"

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
	type?: "constructor" | "function" | "lambda" | "type"
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

export function Background(props: PropsWithChildren<CommonProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBgContainer, "doc-builder")}>
			{props.children}
		</div>
	);
}

type ContainerProps = {
	internal?: boolean
	internalText?: string
} & CommonProps

function ContainerWrapper(props: PropsWithChildren<ContainerProps>): ReactNode {
	if (props.internal) {
		return <details className={styles.details}>
			<summary className={styles.detailsSummary}>
				Show/Hide
				{
					props.internalText === null || props.internalText === undefined ?
						" Internal APIs" :
						" " + props.internalText
				}
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

export function DetailsContainer(props: PropsWithChildren<CommonProps>): ReactNode {
	return <div className={clsx(styles.detailsContainer)}>
		{props.children}
	</div>
}

type DetailsProps = {
	header: string | ReactNode
} & CommonProps

export function Details(props: PropsWithChildren<DetailsProps>): ReactNode {
	return <details className={clsx(props.className)}>
		<summary>{props.header}</summary>

		<div className={clsx(styles.detailsInner)}>
			{props.children}
		</div>
	</details>
}

// endregion

// region: Items

type ArgProps = {
	name: string,
	type?: string | string[] | undefined,
	supportsCollections?: boolean,
	default?: string,
	internal?: boolean,
	propType?: "val" | "open val" | "override val" | "var" | "open var" | "override var",
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
					{props.internal ? <Internal/> : <></>}

					<code className={clsx(styles.headMed, "shadow--lw")}>
						{
							props.propType === null || props.propType === undefined ?
								<></> :
								<span className="text-info">{props.propType}&nbsp;</span>
						}
						{props.name}
					</code>

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
					{props.internal ? <Internal/> : <></>}

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

type ConverterProps = {
	name: string,
	codeName: string | string[],
	valueType: string,
	types: ("single" | "defaulting" | "optional" | "coalescing" | "list" | "choice")[],
	internal?: boolean,
	intents?: string | string[],
} & CommonProps

export function Converter(props: PropsWithChildren<ConverterProps>): ReactNode {
	let names: string[] = []
	let intents: string[] = []

	if (typeof (props.codeName) === "string") {
		names = [props.codeName]
	} else {
		names = props.codeName
	}

	if (typeof (props.intents) === "string") {
		intents = [props.intents]
	} else if (props.intents !== undefined && props.intents !== null) {
		intents = props.intents
	}

	names.sort()
	props.types.sort()

	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-converter")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal/> : <></>}

					<div className={clsx(styles.headMed, "text-capitalize")}>
						{props.name} Converter
					</div>

					<Tag style="success">
						Name{names.length == 1 ? "" : "s"}:
						{
							names.length == 1 ?
								<code>{names[0]}</code> :
								names.map((it) => {
									return <code>{it as string}</code>;
								})
						}
					</Tag>

					{
						intents.length < 1 ?
							<></> :
							<Tag style="danger">
								Intent{intents.length == 1 ? "" : "s"}:
								{intents
									.sort()
									.map((it) => {
										return <div
											className={clsx(styles.likeCode, "shadow--lw", "code", "text-capitalize")}>
											{it}
										</div>
									})}
							</Tag>
					}

					<Tag style="warning">
						Type{props.types.length == 1 ? "" : "s"}: {
						props.types
							.sort()
							.map((it) => {
								return <div className={clsx(styles.likeCode, "shadow--lw", "code", "text-capitalize")}>
									{it}
								</div>
							})
					}
					</Tag>

					<Tag style="info">
						Value:
						<code className="shadow--lw">
							{
								props.valueType.includes(".") ?
									<>
										<span className="text-translucent">
											{splitLast(props.valueType, ".")[0]}
											.
										</span>

										<span className="text-bold">
											{splitLast(props.valueType, ".")[1]}
										</span>
									</> :
									<>{props.valueType}</>
							}
						</code>
					</Tag>
				</Tags>
			</div>

			{
				props.children === undefined ?
					<></> :
					<div className={clsx(styles.indent)}>
						{props.children}
					</div>
			}
		</div>
	)
		;
}

type FunctionProps = {
	name: string,
	receiver?: string,
	returns?: string | string[],
	default?: boolean,
	suspend?: boolean,
	open?: boolean,
	abstract?: boolean,
	internal?: boolean,
} & CommonProps

export function Function(props: PropsWithChildren<FunctionProps>): ReactNode {
	let returnsList: string[] = []

	if (props.returns !== undefined) {
		if (typeof (props.returns) === "string") {
			returnsList = [props.returns]
		} else {
			returnsList = props.returns
		}
	}

	returnsList.sort()

	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-function")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal/> : <></>}

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
						returnsList.length > 0 ?
							<Tag style="info">
								Returns:
								{
									returnsList.map((it) => (
										<div>
											<code className="shadow--lw">{it}</code>
										</div>
									))
								}
							</Tag> :
							<></>
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
	visibility?: "public" | "protected" | "private" | "internal",
	propType?: "val" | "var",
} & CommonProps

export function Property(props: PropsWithChildren<PropertyProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-property")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal/> : <></>}

					<code className={clsx(styles.head, "shadow--lw")}>
						{
							props.visibility === null || props.visibility === undefined || props.visibility === "public" ?
								<></> :
								<span className="text-danger">{props.visibility}&nbsp;</span>
						}

						{
							props.abstract !== true ? <></> :
								<span className="text-info">abstract&nbsp;</span>
						}

						{
							props.open !== true ? <></> :
								<span className="text-info">open&nbsp;</span>
						}

						{
							props.propType === null || props.propType === undefined ?
								<></> :
								<span className="text-info">{props.propType}&nbsp;</span>
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
	extends?: string[],
} & CommonProps

export function Type(props: PropsWithChildren<TypeProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-type")}>
			<div className={clsx(styles.row)} style={{marginBottom: "0.25em"}}>
				<Tags>
					{props.internal ? <Internal/> : <></>}

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
						&nbsp;{props.name} {
						props.extends === null || props.extends === undefined ?
							<></> :
							" : " + props.extends.join(", ")
					}
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

// region: Misc utils

function splitLast(str: string, delimiter: string): string[] {
	if (!str.includes(delimiter)) {
		return [str]
	}

	const parts = str.split(delimiter)
	const last = parts.pop()

	return [parts.join(delimiter), last]
}

// endregion
