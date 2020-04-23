import React from "react";
import { API_KEY, API_ADDRESS } from "../config";
import { useCreateRequestToken } from ".";

const requestTokenRequestAddress = "/authentication/token/new";

const useRequestToken = () => {
	const [request_token, setRequestToken] = React.useState(window.sessionStorage.getItem("request_token"))
	React.useMemo(async () => {
		if (request_token) return;
		const url = `${API_ADDRESS}${requestTokenRequestAddress}?api_key=${API_KEY}`
		const response = await fetch(url, {
			method: "GET", headers: {
				"cache-control": "no-cache"
			}
		});
		if (response.status < 200 || response.status >= 300) {
			console.error("useRequestToken error", response.statusText)
			return Promise.reject("useRequestToken error " + response.statusText)
		}
		const json = await response.json();
		window.sessionStorage.setItem("request_token", json?.request_token)
		setRequestToken(json?.request_token);
		return Promise.resolve(json?.request_token)
	}, [request_token])
	return request_token;
}
export default useRequestToken;