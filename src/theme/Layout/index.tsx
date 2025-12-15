import React, {type ReactNode, useState} from "react";
import Layout from "@theme-original/Layout";
import type LayoutType from "@theme/Layout";
import type {WrapperProps} from "@docusaurus/types";
import styles from "./style.module.css"
import clsx from "clsx";
import {Icon} from "@iconify/react"; // Import the entire Iconify library.
import {Tooltip} from "react-tooltip"

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
	return (
		<>
			<Tooltip id="internal-api-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Internal API - may change without warning!
			</Tooltip>

			<Tooltip id="required-api-tooltip" place="bottom" className="react-tooltip"
			         classNameArrow="react-tooltip-arrow" opacity="1">
				Required - if you don't set this, things won't work properly!
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

			<Layout {...props} />
		</>
	);
}
