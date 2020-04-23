import React from "react";
import useFetch from "use-http";
import { API_ADDRESS, API_KEY } from "../config";
import { Loading, useNotify } from "react-admin";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import {
	BarChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Bar,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
const tmdbTopRatedUrl = "/movie/top_rated";

const useStyles = makeStyles({
	paperRoot: {
		marginBottom: "1em",
		display: "flex",
		height: "100%",
		flexDirection: "column",
		textAlign: "center",
	},
	title: {
		margin: "0.25em",
	},
});
const Chart: React.FC = (props: any) => {
	const notify = useNotify();
	const classes = useStyles();
	const url = `${API_ADDRESS}${tmdbTopRatedUrl}?api_key=${API_KEY}`;
	const { loading, error, data } = useFetch(url, { method: "GET" }, []);
	if (loading) {
		return <Loading />;
	}
	if (error && error.name) {
		notify(error.name, "error");
		return <div>An error occured ahah</div>;
	}
	const topRatedMovies: any[] = data.results;
	const top10RatedMovies = topRatedMovies.slice(0, 10);
	return (
		<>
			<Paper className={classes.paperRoot}>
				<Typography
					className={classes.title}
					variant="body1"
					color="textPrimary"
				>
					Score x Movie
				</Typography>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart
						data={top10RatedMovies}
						margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
						<XAxis
							dataKey="original_title"
							interval={0}
							tick={{ fontSize: "10px", wordWrap: "ellipsis" }}
							label={{
								value: "Title",
								position: "center",
								offset: 900,
							}}
						/>
						<YAxis
							label={{
								value: "Average Score",
								angle: -90,
								position: "center",
							}}
						/>
						<Tooltip />
						<CartesianGrid stroke="#f5f5f5" />
						<Bar dataKey="vote_average" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
			</Paper>
			<Paper className={classes.paperRoot}>
				<Typography
					className={classes.title}
					variant="body1"
					color="textPrimary"
				>
					Vote Count x Movie
				</Typography>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart
						width={720}
						height={360}
						data={top10RatedMovies}
						margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
						<XAxis
							dataKey="original_title"
							interval={0}
							tick={{ fontSize: "10px", wordWrap: "ellipsis" }}
							label={{
								value: "Title",
								position: "center",
								offset: 900,
							}}
						/>
						<YAxis
							label={{
								value: "Vote Count",
								angle: -90,
								position: "insideLeft",
							}}
						/>
						<Tooltip />
						<CartesianGrid stroke="#f5f5f5" />
						<Bar dataKey="vote_count" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
			</Paper>
		</>
	);
};

export default Chart;
