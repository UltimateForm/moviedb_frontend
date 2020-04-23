import React from "react";
import { useRequestToken } from ".";
import { API_KEY, API_ADDRESS } from "../config";


type UseSessionHook = () => { loading: boolean, session_id: string | null };
const requestSessioAddress = "/authentication/session/new";


//only works sometimes and i've already wasted too much time trying to figure out why
const useSession: UseSessionHook = () => { //this is a bit messy
	const [sessionID, setSessionID] = React.useState(window.sessionStorage.getItem("session_id"))
	const [loading, setLoading] = React.useState(false)
	const request_token = useRequestToken();
	React.useMemo(async () => {
		console.log("RUNNING", request_token, sessionID)
		if (sessionID) return;
		if (!request_token) return;
		const url = `${API_ADDRESS}${requestSessioAddress}?api_key=${API_KEY}&request_token=${request_token}`
		setLoading(true)
		const response = await fetch(url, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"cache-control":"no-cache"
			},
			cache:"no-cache"
		});
		if (response.status < 200 || response.status >= 300) {
			console.error("useSession error", response.statusText)
			setLoading(false)
			return Promise.reject(response.statusText);
		}
		const json = await response.json();
		if (!json.session_id) {
			console.error("useSession error", response.statusText)
			setLoading(false)
			return Promise.reject(json.status_message)
		}
		window.sessionStorage.setItem("session_id", json?.session_id)
		setSessionID(json?.session_id);
		setLoading(false)
		return Promise.resolve(json?.session_id)
	}, [request_token, sessionID])
	return { loading, session_id: sessionID };
}
export default useSession;