import React from "react";
import { Route } from "react-router";
import { Dialog } from "@material-ui/core";
import MovieDetails from "./MovieDetails";
import { Show } from "react-admin";

const DetailsDrawer: React.FC<any> = (props: any) => {
	const { resource, history, basePath } = props;
	console.log("DetailsDrawer render");

	return (
		<Route path={`${basePath}/:id/show`}>
			{(routeProps) => {
				const { match } = routeProps;
				const isMatch: boolean =
					match !== null && match.path.endsWith("show");
				return (
					<Dialog
						open={isMatch}
						maxWidth="md"
						onClose={() => history.push(basePath)}
					>
						{isMatch ? (
							<Show
								{...props}
								id={match?.params?.id}
								component="div"
							>
								<MovieDetails />
							</Show>
						) : (
							<div></div>
						)}
					</Dialog>
				);
			}}
		</Route>
	);
};

export default DetailsDrawer;
