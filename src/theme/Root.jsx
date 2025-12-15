import { Store } from "/src/stores/globalStore";

import React from "react";
import { Provider } from 'react-redux'

export default function Root({children}) {
	return <Provider store={Store}>
		{children}
	</Provider>;
}
