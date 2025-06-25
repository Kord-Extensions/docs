import React, {PropsWithChildren, ReactNode} from "react";
import {useGlobalSelector} from "@site/src/stores/globalHooks";

import Loader from "@site/src/components/Loader";

interface WaitProps {
	inText: boolean
}

export default function(props: PropsWithChildren<WaitProps>): ReactNode {
	const isConfigured = useGlobalSelector((state) => state.versions.configured)

	return <>
		{
			isConfigured ?
				props.children :
				props.inText === true ?
					<Loader /> :
					<div className="text-primary mt-1">Please wait, loading versions...</div>
		}
	</>
}
