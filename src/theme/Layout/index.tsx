import React, {type ReactNode, useState} from "react";
import Layout from "@theme-original/Layout";
import type LayoutType from "@theme/Layout";
import type {WrapperProps} from "@docusaurus/types";
import styles from "./style.module.css"
import clsx from "clsx";
import {Icon} from "@iconify/react"; // Import the entire Iconify library.
import {Tooltip} from "react-tooltip"

import {Icons} from "/src/icons";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<Tooltip id="internal-api-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Internal API - may change without warning!
			</Tooltip>

			<Tooltip id="negative-check-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Negated check, opposite to a normal check.
			</Tooltip>

			<Tooltip id="positive-check-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Normal check.
			</Tooltip>

			<Tooltip id="api-dependency-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				API Dependency
			</Tooltip>

			<Tooltip id="runtime-dependency-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Runtime Dependency
			</Tooltip>

			<Tooltip id="wip-tooltip" place="left" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Work in progress!
			</Tooltip>

			<Tooltip id="generic-tooltip" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1" />

			{
				// TODO: Remove warning on release!
				isOpen ?
					<div className={styles.full}>
						<div className={clsx(styles.grow, "card warning no-border", styles.note)}>
							<div className={styles.row}>
								<span className={styles.header}>Work In Progress</span>
								<div className={styles.grow}></div>

								<a href="#" onClick={(e) => {
									setIsOpen(false);
									e.preventDefault()
								}}>
									<Icon icon={Icons.close} height="1.5em" className="text-inverted"/>
								</a>
							</div>

							<div>
								This documentation is in beta. It's missing lots of content, search is
								broken, and many links go nowhere.
								These problems will be fixed before release, but there's plenty of work left!
							</div>
						</div>
					</div> :
					<></>
			}

			<Layout {...props} />
		</>
	);
}
