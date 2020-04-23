import React from "react";
import {
	Typography,
	Button,
	makeStyles,
	Link,
	CircularProgress,
} from "@material-ui/core";
import { API_ADDRESS, API_KEY } from "../config";

const useStyles = makeStyles({
	root: {
		margin: "1em",
		textAlign: "center",
	},
});

//https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
const validation_url = "https://www.themoviedb.org/authenticate";
const requestTokenRequestAddress = "/authentication/token/new";
const requestSessioAddress = "/authentication/session/new";

const Validator: React.FC<any> = (props: any) => {
	const { children } = props;
	const [waitingFocus, setWaitingFocus] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [requestToken, setRequestToken] = React.useState<string | undefined>(
		undefined
	);
	const classes = useStyles();
	const session_id = window.sessionStorage.getItem("session_id");

	//spent too much on this, this is ugly but its the best approach rn
	React.useMemo(async () => {
		if (waitingFocus || loading) return;
		if (window.sessionStorage.getItem("session_id")) return;
		setLoading(true);
		if (!requestToken) {
			const url_request_token = `${API_ADDRESS}${requestTokenRequestAddress}?api_key=${API_KEY}`;
			const response1 = await fetch(url_request_token, {
				method: "GET",
				headers: {
					"cache-control": "no-cache",
				},
			});
			if (response1.status < 200 || response1.status >= 300) {
				setLoading(false);
				return Promise.reject(
					"useRequestToken error " + response1.statusText
				);
			}
			const json1 = await response1.json();
			const request_token = json1.request_token;
			setRequestToken(request_token);
		}

		const url_session_id = `${API_ADDRESS}${requestSessioAddress}?api_key=${API_KEY}&request_token=${requestToken}`;
		const response2 = await fetch(url_session_id, {
			method: "GET",
			headers: {
				"cache-control": "no-cache",
			},
		});
		if (response2.status < 200 || response2.status >= 300) {
			setLoading(false);
			return Promise.reject(response2.statusText);
		}
		const json = await response2.json();
		if (!json.session_id) {
			console.error("useSession error", response2.statusText);
			setLoading(false);
			return Promise.reject(json.status_message);
		}
		window.sessionStorage.setItem("session_id", json.session_id);
		return Promise.resolve(json.session_id);
	}, [waitingFocus, session_id]);

	React.useLayoutEffect(() => {
		const setWaitingFalse = () => {
			setWaitingFocus(false);
		};
		window.addEventListener("focusin", setWaitingFalse);
		return () => {
			window.removeEventListener("focusin", setWaitingFalse);
		};
	}, []);

	const current_page = window.location.href; //this could be problematic, if it is, we can use react-router's thing coming from react-admin

	if (!session_id) {
		return (
			<div className={classes.root}>
				<Typography variant="body1" color="textPrimary">
					To score this movie you must validate your session at
					TheMovieDB first
				</Typography>
				{waitingFocus || loading ? (
					<CircularProgress color="primary" />
				) : (
					<Link
						target="_blank"
						rel="noopener"
						href={`${validation_url}/${requestToken}`} //redirect doesnt work of course, why would it work :)
					>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setWaitingFocus(true);
							}}
						>
							Validate at TMBD
						</Button>
					</Link>
				)}
			</div>
		);
	}
	return (
		<>
			{React.Children.map(children, (child) =>
				React.cloneElement(child, {
					...child.props,
					session_id:session_id
				})
			)}
		</>
	);
};
export default Validator;
