import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type Props = {
	className?: string | null,
}

type TitleProps = {
	title: string,
}

export function CardRow({children, className = null} : PropsWithChildren<Props>): ReactNode {
	return (
		<section className={clsx("row", styles.cardRow, className)}>
			{children}
		</section>
	);
}

export function Card({children, className = null} : PropsWithChildren<Props>): ReactNode {
	return (
		<article className={clsx("card", "margin-bottom--md", styles.card, className)}>
			{children}
		</article>
	);
}


export function CardWithTitle({children, title, className = null} : PropsWithChildren<Props & TitleProps>): ReactNode {
	return (
		<article className={"margin-bottom--md"}>
			<div className={clsx("card", styles.card, className)}>
				<h3>{title}</h3>

				{children}
			</div>
		</article>
	);
}
