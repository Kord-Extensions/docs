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

type ContainerProps = {

} & CommonProps

export function Arguments(props : PropsWithChildren<CommonProps>): ReactNode {
	return (
		<div className={clsx(props.className)}>
			<div className={clsx(styles.headMed, "mb-0.5")}>Arguments</div>

			<div className={styles.col}>
				{props.children}
			</div>
		</div>
	);
}

export function Container(props : PropsWithChildren<ContainerProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.container)}>
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

export function Arg(props : PropsWithChildren<ArgProps>): ReactNode {
	return (
		<div className={clsx(props.className)}>
			<div className={clsx(styles.row)}>
				<code className={styles.headMed}>{props.name}</code>

				<Tags>
					<Tag>
						Type: <code>{props.type}</code>
					</Tag>
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
	receiver?: string,
} & CommonProps

export function Builder(props : PropsWithChildren<BuilderProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col)}>
			<div className={clsx(styles.row)}>
				<code className={styles.head}>{props.name}</code>

				<Tags>
					{
						props.receiver == undefined ? <></> :
							<Tag>
								Receiver: <code>{props.receiver}</code>
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
} & CommonProps

export function Function(props : PropsWithChildren<FunctionProps>): ReactNode {
	return (
		<div className={clsx(props.className)}>
			{props.children}
		</div>
	);
}

type PropertyProps = {
	name: string,
	type: string,
	default?: string,
} & CommonProps

export function Property(props : PropsWithChildren<PropertyProps>): ReactNode {
	return (
		<div className={clsx(props.className, styles.col)}>
			<div className={clsx(styles.row)}>
				<code className={styles.head}>{props.name}</code>

				<Tags>
					<Tag>
						Type: <code>{props.type}</code>
					</Tag>

					{
						props.default == undefined ? <></> :
							<Tag>
								Default: <code>{props.default}</code>
							</Tag>
					}
				</Tags>
			</div>

			<div className={clsx(styles.row, styles.indent)}>
				{props.children}
			</div>
		</div>
	);
}

// endregion
