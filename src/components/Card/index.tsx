import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";

type CommonProps = {
	className?: string | null,
}

type CardProps = {
	style?: "primary" | "secondary" | "danger" | "info" | "success" | "warning",
} & CommonProps

type TitleProps = {
	title: string,
} & CardProps

export function CardRow(props: PropsWithChildren<CommonProps>): ReactNode {
	return (
		<section className={clsx("cardRow", props.className)}>
			{props.children}
		</section>
	);
}

export function Card(props: PropsWithChildren<CardProps>): ReactNode {
	return (
		<article className={clsx("card", "margin-bottom--md", "shadow--lw", props.style, props.className)}>
			{props.children}
		</article>
	);
}

export function CardWithTitle(props: PropsWithChildren<TitleProps>): ReactNode {
	return (
		<Card className={props.className} style={props.style}>
			<div>
				<Heading as="h3">{props.title}</Heading>
			</div>

			{props.children}
		</Card>
	);
}
