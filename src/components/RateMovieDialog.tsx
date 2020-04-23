import React, { useMemo } from "react";
import {
	Dialog,
	TextField,
	CircularProgress,
	makeStyles,
	Typography,
	Slider,
	Button,
} from "@material-ui/core";
import { showNotification, useNotify } from "react-admin";
import SaveIcon from "@material-ui/icons/Save";
import { API_ADDRESS, API_KEY } from "../config";
import { SessionValidator } from ".";

const useStyles = makeStyles({
	root: {
		margin: "1em",
		textAlign: "center",
		minWidth: "256px",
	},
	slider: {
		marginTop: "40px",
	},
});

// /movie/{movie_id}/rating
const RaterDialog: React.FC<any> = (props: any) => {
	const { open, handleClose, record, ...restPRops } = props;
	return (
		<Dialog maxWidth="sm" open={open} onClose={handleClose}>
			<SessionValidator>
				<Rater
					submit={handleClose}
					movie_id={record["id"]}
					movie_title={record["original_title"]}
				/>
			</SessionValidator>
		</Dialog>
	);
};
const Rater: React.FC<any> = (props: any) => {
	const { session_id, movie_id, movie_title, submit } = props;
	const [saving, setSaving] = React.useState(false);
	const notify = useNotify();
	const classes = useStyles();
	const defaultValue = 5;
	const scoreRef = React.useRef({ score: defaultValue }); //to avoid rerenders and other shenanigans
	const onScoreChange = (value: number | number[]) => {
		scoreRef.current.score = value as number; //it is a number, its fine
	};
	const saveScore = async () => {
		setSaving(true);
		const url = `${API_ADDRESS}/movie/${movie_id}/rating?api_key=${API_KEY}&session_id=${session_id}`;
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({ value: scoreRef.current.score }),
		});
		if (response.status < 200 || response.status >= 300) {
			notify("Error rating movie.", "error");
		} else notify("Movie Rated!");
		setSaving(false);
		submit && submit();
	};
	return (
		<div className={classes.root}>
			{/* could use a form here but not that serious*/}
			<Typography id="score-slider" gutterBottom>
				{`Score ${movie_title}`}
			</Typography>
			<Slider
				className={classes.slider}
				defaultValue={defaultValue}
				valueLabelDisplay="on"
				onChangeCommitted={(event, value) => onScoreChange(value)}
				step={0.5}
				min={0.5}
				max={10}
			/>
			<Button
				disabled={saving}
				startIcon={
					saving ? (
						<CircularProgress size={20} color="primary" />
					) : (
						<SaveIcon />
					)
				}
				color="primary"
				onClick={() => saveScore()}
				variant="contained"
			>
				Save
			</Button>
		</div>
	);
};

export default RaterDialog;
