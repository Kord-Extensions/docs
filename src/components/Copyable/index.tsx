import React, {PropsWithChildren, ReactNode} from "react";
import { Icon, loadIcons } from "@iconify/react";
import { Tooltip } from"react-tooltip";
import {Icons} from "/src/icons";

type CopyableProps = {
	key?: React.Key,
	content: string,
	prompt?: string,
	tooltipPlace?: string,
	fontSize?: string,
}

const TIMEOUT = 1000 * 3

const DEFAULT_TEXT = "Copy Text"
const CLICKED_TEXT = "Copied!"

export function Copyable(props: CopyableProps): ReactNode {
	const [isSetting, setIsSetting] = React.useState(false);
	const [icon, setIcon] = React.useState<string>(Icons.copyDefault)
	const [text, setText] = React.useState(props.prompt ?? DEFAULT_TEXT);

	return <Icon icon={icon}
	             style={{alignSelf: "center", cursor: "pointer"}}
	             fontSize={props.fontSize ?? "25px"}
	             data-tooltip-id="generic-tooltip"
	             data-tooltip-content={text}
	             data-tooltip-place={props.tooltipPlace ?? "bottom"}
	             key={props.key}
	             onClick={e => {
		             e.preventDefault();

		             navigator.clipboard.writeText(props.content).then(() => {
			             if (!isSetting) {
				             setIsSetting(true);
				             setIcon(Icons.copyClicked)
				             setText(CLICKED_TEXT)

				             setTimeout(() => {
					             setIcon(Icons.copyDefault)
					             setText(DEFAULT_TEXT)

					             setIsSetting(false)
				             }, TIMEOUT)
			             }
		             })
	             }}
	/>
}
