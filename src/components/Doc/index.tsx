import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import {Icon, InlineIcon} from "@iconify/react";
import {Tooltip} from "react-tooltip"

import {Tag, Tags} from "../Tags";
import {Icons} from "/src/icons";

// region Common

type CommonProps = {
	className?: string | null,
}

export function Required(): ReactNode {
	return (
		<div style={{display: "flex", alignItems: "center", width: "2.5em"}} data-tooltip-id="required-api-tooltip">
			<Icon icon="fluent:arrow-import-20-filled" width="2.5em" className="text-danger"></Icon>
		</div>
	)
}

export function Internal(): ReactNode {
	return (
		<div style={{display: "flex", alignItems: "center", width: "2.5em"}} data-tooltip-id="internal-api-tooltip">
			<Icon icon="fluent:warning-20-filled" width="2.5em" className="text-warning"></Icon>
		</div>
	)
}

export function NoIcon(): ReactNode {
	return (
		<div style={{display: "flex", alignItems: "center", width: "2.5em"}}>
			<span style={{width: "2.5em"}}>&nbsp;</span>
		</div>
	)
}

export function NegativeCheck(props: PropsWithChildren): ReactNode {
	return (
		<>
			{
				props.children !== undefined ?
					<Tags>
						<Tag className={"mr-0.5"}>
							<div style={{display: "flex", alignItems: "center"}}
							     data-tooltip-id="negative-check-tooltip">

								<div style={{width: "1.2em", display: "flex", alignItems: "center"}} className="mr-0.5">
									<InlineIcon icon={Icons.checkNegative} width="1.2em" className="text-danger"></InlineIcon>
								</div>

								Negated
							</div>
						</Tag>

						<p style={{alignSelf: "center", display: "inline"}}>
							{props.children}
						</p>
					</Tags> :
					<div style={{display: "flex", alignItems: "center", width: "1.2em"}}
					     className="mr-0.5"
					     data-tooltip-id="negative-check-tooltip">

						<InlineIcon icon={Icons.checkNegative} width="1.2em" className="text-danger"></InlineIcon>
					</div>
			}
		</>
	)
}

export function PositiveCheck(props: PropsWithChildren): ReactNode {
	return (
		<>
			{
				props.children !== undefined ?
					<Tags>
						<Tag className={"mr-0.5"}>
							<div style={{display: "flex", alignItems: "center"}}
							     data-tooltip-id="positive-check-tooltip">

								<div style={{width: "1.2em", display: "flex", alignItems: "center"}} className="mr-0.5">
									<InlineIcon icon={Icons.checkPositive} width="1.2em" className="text-success"></InlineIcon>
								</div>

								<span style={{paddingRight: "0.5em"}}>
									Normal
								</span>
							</div>
						</Tag>

						<p style={{alignSelf: "center", display: "inline"}}>
							{props.children}
						</p>
					</Tags> :
					<div style={{display: "flex", alignItems: "center", width: "1.2em"}}
					     className="mr-0.5"
					     data-tooltip-id="positive-check-tooltip">

						<InlineIcon icon={Icons.checkPositive} width="1.2em" className="text-success"></InlineIcon>
					</div>
			}
		</>
	)
}

// endregion

// region Containers

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

type CheckNotesProps = {
} & CommonProps

export function CheckNotes(props: PropsWithChildren<CheckNotesProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.args, "doc-check-notes")}>
			<div className={clsx(styles.headMed, "mb-0.5")}>
				Notes
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

type WrongEventProps = {
	missing: string;
} & CommonProps

export function WrongEvent(props: PropsWithChildren<WrongEventProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.args, "doc-wrong-events")}>
			<div className={clsx(styles.headMed, "mb-0.5")}>
				Events without {toTitleCase(props.missing)}
			</div>

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent, styles.col)}>
					For events without {props.missing.toLowerCase()}:
					{props.children}
				</div>
			}
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

type EnumMembersProps = {} & CommonProps

export function EnumMembers(props: PropsWithChildren<EnumMembersProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.args, "doc-enum-members")}>
			<div className={clsx(styles.headMed, "mb-0.5")}>
				Enum Members
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

export function Indent(props: PropsWithChildren<CommonProps>): ReactNode {
	return <div className={clsx(styles.indent, props.className)}>
		{props.children}
	</div>
}

// endregion

// region Items

type ArgProps = {
	name: string,
	type?: string | string[] | undefined,
	supportsCollections?: boolean,
	default?: string,
	reified?: boolean,
	internal?: boolean,
	required?: boolean,
	variance?: "in" | "out",
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
		<div className={clsx(props.className, styles.arg, "doc-argument")} key={`${props.name}-container`}>
			<div className={clsx(styles.row)} style={{marginBottom: "0.25em"}} key={`${props.name}-inner`}>
				<Tags key={`${props.name}-tags`}>
					{props.internal ? <Internal/> : <></>}
					{props.required ? <Required/> : <></>}

					<code className={clsx(styles.headMed, "shadow--lw")} key={`${props.name}-tag-code`}>
						{props.reified === true ? <span className="text-danger">reified&nbsp;</span> : <></>}
						{props.variance !== undefined ? <span className="text-danger">{props.variance}&nbsp;</span> : <></>}
						{
							props.propType === null || props.propType === undefined ?
								<></> :
								<span className="text-info">{props.propType}&nbsp;</span>
						}
						{props.name}
					</code>

					{
						props.type === undefined ? <></> :
							<Tag style="primary" key={`${props.name}-tag-types`}>
								{typeof (props.type) === "string" ?
									<>
										<span>Type:</span> <code className="shadow--lw">{props.type}</code>
									</> :
									<>
										<span>Types:</span>

										{props.type.map((overload) => (
											<code className="shadow--lw" key={`${props.name}-tag-types-${overload}`}>
												{overload}
											</code>
										))}

										{props.supportsCollections === true ?
											<>
												{hasMultipleTypes ?
													<>
														&amp;
														<code className="shadow--lw" key={`${props.name}-tag-types-collection-multi`}>
															Collection&lt;T&gt;
														</code>
													</> :
													<code className="shadow--lw" key={`${props.name}-tag-types-collection-single`}>
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
							<Tag style="success" key={`${props.name}-tag-default`}>
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
	hasGeneric?: boolean,
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
							{props.hasGeneric ? "<...>" : ""}
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

type CheckProps = {
	name: string,
	function?: boolean,
	builder?: boolean,
	combined?: boolean,
	negative?: string,
} & CommonProps

export function Check(props: PropsWithChildren<CheckProps>): ReactNode {
	const totalVersions = [props.function, props.builder, props.combined].filter((it) => (it)).length
	const singleRow = totalVersions < 2

	function getCodeElements(name: string, props: PropsWithChildren<CheckProps>, tagElement: ReactNode) {
		return <>
			{
				props.function ?
					<code className={clsx(styles.head, "shadow--lw")}>
						{tagElement}
						{name}
						<span className="text-secondary">(...)</span>
					</code> :
					<></>
			}

			{
				props.builder ?
					<code className={clsx(styles.head, "shadow--lw")}>
						{tagElement}
						{name}
						<span className="text-secondary">&nbsp;{"{ ... }"}</span>
					</code> :
					<></>
			}

			{
				props.combined ?
					<code className={clsx(styles.head, "shadow--lw")}>
						{tagElement}
						{name}
						<span className="text-secondary">(...) {"{ ... }"}</span>
					</code> :
					<></>
			}

			{
				props.function !== true && props.builder !== true && props.combined !== true ?
					<code className={clsx(styles.head, "shadow--lw")}>
						{tagElement}
						{name}
					</code> :
					<></>
			}
		</>
	}

	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-check")}>
			{
				singleRow ?
					<div className={clsx(styles.row)}>
						<Tags>
							{getCodeElements(props.name, props, <PositiveCheck />)}

							{
								props.negative !== undefined ?
									getCodeElements(props.negative, props, <NegativeCheck />) :
									<></>
							}
						</Tags>
					</div> :
					<>
						<div className={clsx(styles.row)}>
							<Tags>
								{getCodeElements(props.name, props, <PositiveCheck />)}
							</Tags>
						</div>

						{
							props.negative !== undefined ?
								<div className={clsx(styles.row)}>
									<Tags>
										{getCodeElements(props.negative, props, <NegativeCheck />)}
									</Tags>
								</div> :
								<></>
						}
					</>
			}

			{props.children === undefined ?
				<></> :
				<div className={clsx(styles.indent)}>
					{props.children}
				</div>
			}
		</div>
	);
}

type CliArgProps = {
	name: string | string[],
	arg?: string | string[],
	reqiured?: boolean,
	default?: string
} & CommonProps

export function CliArg(props: PropsWithChildren<CliArgProps>): ReactNode {
	let args: string[]
	let names: string[]

	if (typeof (props.arg) === "string") {
		args = [props.arg]
	} else if (props.arg === undefined) {
		args = []
	} else {
		args = props.arg
	}

	if (typeof (props.name) === "string") {
		names = [props.name]
	} else {
		names = props.name
	}

	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-builder")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.required ? <Required/> : <></>}

					{names.map((it) =>
						<code className={clsx(styles.head, "shadow--lw")}>
							{it}

							{args.map((arg) =>
								<span className="text-success">
									&nbsp;{arg}
								</span>
							)}
						</code>
					)}

					{
						props.default ?
							<Tag style="success">
								Default: <code className="shadow--lw">{props.default}</code>
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
	hasGeneric?: boolean,
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

						{
							props.receiver == undefined ?
								props.name :
								<>
									<span className="text-success">{props.receiver}</span>
									<span className="text-secondary">.</span>
									{props.name}
								</>

						}
						{props.hasGeneric ? <span className="text-secondary">{"<...>"}</span> : ""}
						<span className="text-secondary">(...)</span>
					</code>

					{
						props.default !== true ? <></> :
							<Tag style="secondary">
								Default
							</Tag>
					}

					{
						returnsList.length > 0 ?
							<Tag style="info">
								Returns:
								{
									returnsList.map((it) => (
										<code className="shadow--lw">{it}</code>
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
	receiver?: string,
	abstract?: boolean,
	open?: boolean,
	default?: string,
	internal?: boolean,
	required?: boolean,
	iconIndent?: boolean,
	visibility?: "public" | "protected" | "private" | "internal",
	propType?: "val" | "var",
} & CommonProps

export function Property(props: PropsWithChildren<PropertyProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col, styles.docBg, "doc-property")}>
			<div className={clsx(styles.row)}>
				<Tags>
					{props.internal ? <Internal/> : <></>}
					{props.required ? <Required/> : <></>}
					{props.iconIndent ? <NoIcon/> : <></>}

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
						{
							props.receiver == undefined ?
								props.name :
								<>
									<span className="text-success">{props.receiver}</span>
									<span className="text-secondary">.</span>
									{props.name}
								</>

						}
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
	extends?: string | string[],
} & CommonProps

export function Type(props: PropsWithChildren<TypeProps>): ReactNode {
	let ext: string[];

	if (typeof(props.extends) === "string") {
		ext = [props.extends]
	} else {
		ext = props.extends
	}

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
							" : " + ext.join(", ")
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

// region Aliases

export const Member = Arg

// endregion

// region Misc utils

function splitLast(str: string, delimiter: string): string[] {
	if (!str.includes(delimiter)) {
		return [str]
	}

	const parts = str.split(delimiter)
	const last = parts.pop()

	return [parts.join(delimiter), last]
}

// endregion
