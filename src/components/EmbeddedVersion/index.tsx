import {ReactNode} from "react";
import {useGlobalSelector} from "@site/src/stores/globalHooks";
import Loader from "@site/src/components/Loader";
import {getVersion} from "@site/src/versions/functions";
import {Copyable} from "@site/src/components/Copyable";
import clsx from "clsx";
import {Property} from "@site/src/components/Doc";
import CodeBlock from "@theme/CodeBlock";

type EmbeddedVersionProps = {
	reference: string
	button?: boolean
	code?: boolean
	codeLang?: string
	copyable?: boolean

	url?: string
	template?: string
	templateTab?: string
}

function Inner(props: EmbeddedVersionProps): ReactNode {
	const version = getVersion(props.reference)
	let url = props.url
	let template = props.template

	if (url !== undefined && template === undefined) {
		template = url.replaceAll("(VERSION)", version)
	} else if (template !== undefined) {
		template = template.replaceAll("(VERSION)", version)
			.replaceAll("%n", "\n")
			.replaceAll("%t", props.templateTab || "    ")
	} else {
		template = version
	}

	return <>
		{
			props.copyable === true ?
				<Copyable content={version} prompt="Copy Version"/> :
				<></>
		}

		{
			props.url !== undefined ?
				<a href={props.url.replaceAll("(VERSION)", version)}
				   target="_blank"
				   rel="noopener noreferrer"
				   className={clsx(props.button === true ? "button button--primary button--block mt-1" : undefined)}
				>
					{
						props.code === true ?
							<code>{template}</code> :
							template
					}
				</a> :
				props.code === true ?
					template.includes("\n") ?
						<CodeBlock language={props.codeLang || "sh"}>{template}</CodeBlock> :
						<code>{template}</code>
					: template
		}
	</>
}

export default function (props: EmbeddedVersionProps): ReactNode {
	const isConfigured = useGlobalSelector((state) => state.versions.configured)

	return <>
		{
			!isConfigured ?
				<Loader/> :
				<Inner {...props} />
		}
	</>
}
