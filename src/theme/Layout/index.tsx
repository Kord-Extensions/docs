import React, {type ReactNode, useState} from "react";
import Layout from "@theme-original/Layout";
import type LayoutType from "@theme/Layout";
import type {WrapperProps} from "@docusaurus/types";
import styles from "./style.module.css"
import clsx from "clsx";
import {Icon} from "@iconify/react"; // Import the entire Iconify library.

type Props = WrapperProps<typeof LayoutType>;

class Note extends React.Component<any> {

	render() {
		return (
			<>
				{
					this.state.isOpen ?
						<div className={clsx(styles.note, "card danger")}>
							<div>
								<span className={styles.header}>Early Version</span>
								<a href="#" onClick={close}>
									<Icon icon="mdi:close-circle"/>
								</a>
							</div>

							<div>
								Content
							</div>
						</div>
						: <></>
				}
			</>
		);
	}
}

export default function LayoutWrapper(props: Props): ReactNode {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			{
				isOpen ?
					<div className={clsx(styles.note, "card danger")}>
						<div className={styles.row}>
							<span className={styles.header}>Work In Progress</span>
							<div className={styles.grow}></div>

							<a href="#" onClick={() => setIsOpen(false)}>
								<Icon icon="mdi:close-circle" height="1.5em" className="text-inverted" />
							</a>
						</div>

						<div>
							This documentation is in beta. It's missing lots of content, search is
							broken, and many links go nowhere.
						</div>

						<div></div>

						<div className={styles.bottom}>
							These problems will be fixed before release, but there's plenty of work left!
						</div>
					</div> :
					<></>
			}

			<Layout {...props} />
		</>
	);
}
