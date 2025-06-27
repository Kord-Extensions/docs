import {ReactNode, useEffect, useState} from "react";
import {getGradle, useGlobalDispatch, useGlobalSelector} from "@site/src/stores/globalHooks";
import {GradleMetadata, GradleVariant} from "@site/src/maven/GradleMetadata";
import Loader from "@site/src/components/Loader";
import {getVersion} from "@site/src/versions/functions";
import {Copyable} from "@site/src/components/Copyable";

type EmbeddedVersionProps = {
	reference: string;
	code?: boolean,
	copyable?: boolean,
}

function Inner(props: EmbeddedVersionProps): ReactNode {
	const version = getVersion(props.reference)

	return <>
		{
			props.copyable === true ?
				<Copyable content={version} prompt="Copy Version" /> :
				<></>
		}
		{
			props.code === true ?
				<code>{version}</code> :
				version
		}
	</>
}

export default function (props: EmbeddedVersionProps): ReactNode {
	const isConfigured = useGlobalSelector((state) => state.versions.configured)

	return <>
		{
			!isConfigured ?
				<Loader /> :
				<Inner {...props} />
		}
	</>
}
