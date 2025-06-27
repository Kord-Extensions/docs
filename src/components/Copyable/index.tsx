import React, {PropsWithChildren, ReactNode} from "react";
import { Icon, loadIcons } from "@iconify/react";
import { Tooltip } from"react-tooltip";

type CopyableProps = {
	key?: React.Key,
	content: string,
	prompt?: string,
	tooltipPlace?: string,
	fontSize?: string,
}

const TIMEOUT = 1000 * 3

const DEFAULT_ICON = "fluent:clipboard-text-ltr-24-filled"
const CLICKED_ICON = "fluent:checkmark-circle-24-regular"

const DEFAULT_TEXT = "Copy Text"
const CLICKED_TEXT = "Copied!"

export function Copyable(props: CopyableProps): ReactNode {
	loadIcons([DEFAULT_ICON, CLICKED_ICON])

	const [isSetting, setIsSetting] = React.useState(false);
	const [icon, setIcon] = React.useState<string>(DEFAULT_ICON)
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
				             setIcon(CLICKED_ICON)
				             setText(CLICKED_TEXT)

				             setTimeout(() => {
					             setIcon(DEFAULT_ICON)
					             setText(DEFAULT_TEXT)

					             setIsSetting(false)
				             }, TIMEOUT)
			             }
		             })
	             }}
	/>
}
