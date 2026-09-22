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

				<a href="https://jb.gg/OpenSource" style={{display: "block", color:"var(--ifm-color-text)", textDecoration: "none", marginTop: "1em", borderRadius: ".5em", width:"fit-content", padding: "1em", marginLeft: "auto", marginRight: "auto", backgroundColor: "color-mix(in srgb, var(--ifm-color-secondary) 40%, transparent)"}}>
					<p style={{ fontSize: "150%", marginBottom: "0" }}>Tooling provided by</p>
					<img src="https://kordex.dev/jetbrains-dark.svg" style={{ height: "4em", marginLeft: "1em" }} />
				</a>
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
