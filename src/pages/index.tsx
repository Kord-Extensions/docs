import type {ReactNode} from "react";
import clsx from "clsx";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import ThemedImage from "@theme/ThemedImage";

import styles from "./index.module.css";

function HomepageHeader() {
	const {siteConfig} = useDocusaurusContext();
	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<ThemedImage
					alt={"Banner: Kord Extensions Docs"}
					style={{maxHeight: "12rem"}}
					sources={{dark: useBaseUrl("/img/banner-dark.svg"), light: useBaseUrl("/img/banner-light.svg")}}
				/>

				<p className="hero__subtitle">{siteConfig.tagline}</p>
			</div>
		</header>
	);
}

export default function Home(): ReactNode {
	return (
		<Layout
			title={`Home`}
			description="Kord Extensions documentation">

			<HomepageHeader/>

			<main>
				<HomepageFeatures/>
			</main>
		</Layout>
	);
}
