import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { RateMovieDialog } from ".";

const Rater: React.FC<any> = (props: any) => {
	const { record } = props;
	const [dialogOpen, setDialogOpen] = React.useState(false);
	return (
		<>
			<Avatar
				color="primary"
				onClick={() => {
					setDialogOpen((value) => !value);
				}}
			>
				{record["vote_average"]}
			</Avatar>
			<RateMovieDialog record={record} open={dialogOpen} handleClose={()=>{setDialogOpen(false)}}/>
		</>
	);
};

export default Rater;
