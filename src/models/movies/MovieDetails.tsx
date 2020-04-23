import React from "react";
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
import { useCreateRequestToken } from "../../hooks";
import { RateMovieButton } from "../../components";

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
		misc_details: {
			display: "flex",
			flexWrap: "wrap",
		},
		data_field: {
			margin: "0.5em",
		},
		content: {
			flex: "1 0 auto",
		},
		cover: {
			width: "50%",
		}
	})
);

const DataLabel: React.FC<any> = (props: any) => (
	<Typography variant="subtitle2" color="textSecondary">
		{props.label}
	</Typography>
);

const MiscDataField: React.FC<any> = (props: any) => {
	const { label, format, record, source } = props;
	const classes = useStyles();
	let value = record[source];
	if (value === undefined) return <></>; //ugh
	value = format ? format(value) : value;
	return (
		<div className={classes.data_field}>
			<DataLabel label={label} />
			<Typography variant="body1">{value}</Typography>
		</div>
	);
};

///there are other ways but i dont have time
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
	//console.log("MovieDetails", props);
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
						<RateMovieButton record={record}/>
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
				{record["genres"] && record["genres"].length > 0 && (
					<CardContent>
						<div>
							<DataLabel label="Genres" />
							{record["genres"].map((genre: any) => (
								<Chip label={genre.name} />
							))}
						</div>
					</CardContent>
				)}
				{record["spoken_languages"] &&
					record["spoken_languages"].length > 0 && (
						<CardContent>
							<div>
								<DataLabel label="Spoken Languages" />
								{record["spoken_languages"].map((lang: any) => (
									<Chip label={lang.name} />
								))}
							</div>
						</CardContent>
					)}{" "}
				{record["production_countries"] &&
					record["production_countries"].length > 0 && (
						<CardContent>
							<div>
								<DataLabel label="Production Countires" />
								{record["production_countries"].map(
									(lang: any) => (
										<Chip label={lang.name} />
									)
								)}
							</div>
						</CardContent>
					)}
				{record["production_countries"] &&
					record["production_companies"].length > 0 && (
						<CardContent>
							<div>
								<DataLabel label="Production Companies" />
								{record["production_companies"].map(
									(lang: any) => (
										<Chip label={lang.name} />
									)
								)}
							</div>
						</CardContent>
					)}
				<CardContent className={classes.misc_details}>
					<MiscDataField
						label="Status"
						record={record}
						source="status"
					/>
					<MiscDataField
						label="Release Date"
						record={record}
						source="release_date"
					/>
					<MiscDataField
						label="Runtime"
						record={record}
						format={Minutes2ReadableDuration}
						source="runtime"
					/>
					<MiscDataField
						label="Budget"
						source="budget"
						record={record}
						format={(value: number) =>
							value.toLocaleString(navigator.language, {
								style: "currency",
								currency: "USD",
							})
						}
					/>
					<MiscDataField
						label="Revenue"
						source="revenue"
						record={record}
						format={(value: number) =>
							value.toLocaleString(navigator.language, {
								style: "currency",
								currency: "USD",
							})
						}
					/>
				</CardContent>
			</div>
		</Card>
	);
};

export default MovieDetails;
