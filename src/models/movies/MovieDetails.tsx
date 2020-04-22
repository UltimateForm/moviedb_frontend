import React from "react";
import { SimpleShowLayout, Show, TextField } from "react-admin";
import {
	Theme,
	createStyles,
	makeStyles,
	useTheme,
} from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	IconButton,
	CardMedia,
	Typography,
	CardHeader,
	Link,
	Avatar,
	Chip,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { MOVIE_DB_IMAGE_PATH } from "../../config";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			marginTop: "-1em", //cancel React-Admin's obnoxious margin-top=1em
		},
		details: {
			display: "flex",
			flexDirection: "column",
		},
		content: {
			flex: "1 0 auto",
		},
		cover: {
			width: "50%",
		},
		controls: {
			display: "flex",
			alignItems: "center",
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		playIcon: {
			height: 38,
			width: 38,
		},
	})
);

const DataLabel: React.FC<any> = (props: any) => (
	<Typography variant="subtitle2" color="textSecondary">
		{props.label}
	</Typography>
);

const MiscDataField: React.FC<any> = (props: any) => {
	const { label, value } = props;
	return (
		<div>
			<DataLabel label={label} />
			<Typography variant="body1">{value}</Typography>
		</div>
	);
};

const Minutes2ReadableDuration = (minutes: number) => {
	var num = minutes;
	var hours = num / 60;
	var rhours = Math.floor(hours);
	var minutes = (hours - rhours) * 60;
	var rminutes = Math.round(minutes);
	return `${rhours}H:${rminutes}M`;
};

const MovieDetails: React.FC<any> = (props: any) => {
	const { record } = props;
	const classes = useStyles();
	const theme = useTheme();
	console.log("MovieDetails", props);
	return (
		/* 		<SimpleShowLayout {...props}>
			<TextField source="title" />
		</SimpleShowLayout> */
		<Card className={classes.root}>
			<CardMedia
				className={classes.cover}
				component="img"
				image={`${MOVIE_DB_IMAGE_PATH}/${record["poster_path"]}`}
				title="Movie Poster Image"
			/>
			<div className={classes.details}>
				<CardHeader
					title={record["title"]}
					subheader={record["tagline"]}
					avatar={
						<Avatar color="primary">
							{record["vote_average"]}
						</Avatar>
					}
					action={
						<Link
							target="_blank"
							rel="noopener"
							href={record["homepage"]} //could use react router but in a rush
						>
							<IconButton color="primary">
								<OpenInNewIcon />
							</IconButton>
						</Link>
					}
				/>
				<CardContent className={classes.content}>
					<Typography variant="body1">
						{record["overview"]}
					</Typography>
				</CardContent>
				{record["genres"]&&record["genres"].length>0 && (
					<CardContent>
						<div>
							<DataLabel label="Genres" />
							{record["genres"].map((genre: any) => (
								<Chip label={genre.name} />
							))}
						</div>
					</CardContent>
				)}
				<CardContent>
					{record["status"] && (
						<MiscDataField
							label="Status"
							value={record["status"]}
						/>
					)}
					{record["release_date"] && (
						<MiscDataField
							label="Release Date"
							value={record["release_date"]}
						/>
					)}
					{record["runtime"]!=undefined && (
						<MiscDataField
							label="Runtime"
							value={Minutes2ReadableDuration(record["runtime"])}
						/>
					)}
					{record["budget"]!=undefined && (
						<MiscDataField
							label="Budget"
							value={record["budget"].toLocaleString(
								navigator.language,
								{
									style: "currency",
									currency: "USD",
								}
							)}
						/>
					)}
				</CardContent>
			</div>
		</Card>
	);
};

export default MovieDetails;
