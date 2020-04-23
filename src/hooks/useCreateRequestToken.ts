import React from "react";
import { API_KEY, API_ADDRESS } from "../config";
import useFetch, { UseFetch } from "use-http";

interface RequestTokenResponse {
	expires_at:string,
	request_token:string,
	success:boolean
}

type UseCreateRequestToken = () => UseFetch<RequestTokenResponse>

const requestTokenRequestAddress = "/authentication/token/new";

const useCreateRequestToken:UseCreateRequestToken = () =>{
	const url = `${API_ADDRESS}${requestTokenRequestAddress}?api_key=${API_KEY}`
	const request = useFetch(url, {method:"GET"}, []);
	return request;
}
export default useCreateRequestToken;