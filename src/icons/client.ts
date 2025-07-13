import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {loadSiteIcons} from "@site/src/icons/index";

if (ExecutionEnvironment.canUseDOM) {
	loadSiteIcons()
}
