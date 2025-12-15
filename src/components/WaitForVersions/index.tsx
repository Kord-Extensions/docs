import React, {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {useGlobalSelector} from "@site/src/stores/globalHooks";

import Loader from "@site/src/components/Loader";
import {useEvent} from "@docusaurus/theme-common";

interface WaitProps {
	inText?: boolean,
	callback?: () => ReactNode,
}

export default function(props: PropsWithChildren<WaitProps>): ReactNode {
	const isConfigured = useGlobalSelector((state) => state.versions.configured)
	const [shouldDisplay, setShouldDisplay] = useState<boolean>(isConfigured)

	useEffect(() => {
		console.log("Configured:", isConfigured)
		console.log("Children:", props.children)

		setShouldDisplay(isConfigured)
	}, [isConfigured]);

	return <>
		{
			shouldDisplay ?
				props.callback !== undefined ?
					props.callback() :
					props.children :
				props.inText === true ?
					<Loader /> :
					<div className="text-primary mt-1">Please wait, loading versions...</div>
		}
	</>
}
