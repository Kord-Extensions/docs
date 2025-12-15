import type {ReactNode} from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

import { Card, CardRow } from "../Card"

type FeatureItem = {
	title: string;
	href?: string;
	to?: string;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: "About the Project",
		to: "about",

		description: (
			<>
				Learn about the Kord Extensions project itself, including information on licencing and contributing,
				and our community spaces.
			</>
		),
	},
	{
		title: "Discord Bots",
		to: "bots",

		description: (
			<>
				Learn how to write Discord bots with the Kord Extensions Discord bot framework &mdash; the premier,
				community-driven bot framework for Kotlin.
			</>
		),
	},
	{
		title: "Internationalisation",
		to: "i18n",

		description: (
			<>
				Learn about the Kord Extensions internationalisation framework, the modular, multi-format i18n toolkit
				for Kotlin.
			</>
		),
	},
	{
		title: "Other Docs",
		to: "misc",

		description: (
			<>
				Documentation for projects and modules that don't fit in any of the other sections.
			</>
		),
	},
];

function Feature({title, href, to, description}: FeatureItem) {
	return (
		<Card style="info" className="text--center col col--4">
			<div className="card__header">
				<Heading as="h3">{title}</Heading>
			</div>

			<div className="card__body">
				<p>{description}</p>
			</div>

			<CardButton href={href} to={to} />
		</Card>
	);
}

function CardButton({href, to}) {
	if (href != undefined || to != undefined) {
		return (
			<div className="card__footer">
				<Link href={href} to={to} className="button button--primary button--block">See All</Link>
			</div>
		)
	} else {
		return <></>
	}
}

export default function HomepageFeatures(): ReactNode {
	return (
		<section className={styles.features}>
			<CardRow>
				{FeatureList.map((props, idx) => (
					<Feature key={idx} {...props} />
				))}
			</CardRow>
		</section>
	);
}
