import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { API_ADDRESS,API_KEY } from "../config";

const httpClient = fetchUtils.fetchJson;

const defaultQueryParams = {
	//unsafe, consider package.json
	//MovieDB api key
	api_key: API_KEY
}

///source https://stackoverflow.com/a/56253298
function flattenObj(obj, parent, res = {}) {
	for (let key in obj) {
		let propName = parent ? parent + '.' + key : key;
		if (typeof obj[key] == 'object') {
			flattenObj(obj[key], propName, res);
		} else {
			res[propName] = obj[key];
		}
	}
	return res;
}

const starndardizeTMDBHorrendousRestResources = (resource, params) => {
	if (resource === "movie") {
		const method = params.filter["search"] ? "search" : "discover";
		return `${method}/${resource}`
	}
	if (resource === "movieGenre") {
		return "genre/movie/list"
	}
	else return resource;
}

const standardizeTMDBHorrendousRestResponses = (resource, json,params) => {
	if (resource === "movie") {
		return {
			data: json.results,
			//total: parseInt(headers.get('content-range').split('/').pop(), 10),
			total: json.total_results,
		}
	}
	if (resource === "movieGenre") {
		return {
			data: params.ids? json.genres.filter(record=>params.ids.includes(record["id"])):json.genres
		}
	}
	else return json;
}
export default {
	getList: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		console.log(field, order)
		const query = {
			sort_by: `${field}.${order.toLowerCase()}`,
			page: page,
			query: params.filter["search"], //dirty? yes but i aint got time right now
			//filter: JSON.stringify(params.filter),
			...flattenObj(params.filter),
			...defaultQueryParams
		};

		const url = `${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => standardizeTMDBHorrendousRestResponses(resource,json));
	},

	getOne: (resource, params) => {
		const query = {
			...defaultQueryParams
		};
		return httpClient(`${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}/${params.id}?${stringify(query)}`).then(({ json }) => standardizeTMDBHorrendousRestResponses(resource,json));
	},

	getMany: (resource, params) => {
		const query = {
			...defaultQueryParams
		};
		const url = `${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}?${stringify(query)}`;
		return httpClient(url).then(({ json }) => {
			return standardizeTMDBHorrendousRestResponses(resource, json,params);
		});
	},
	getManyReference: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			}),
			...defaultQueryParams
		};
		const url = `${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}?${stringify(query)}`;
		return httpClient(url).then(({ headers, json }) =>standardizeTMDBHorrendousRestResponses(resource,json));
	},

	update: (resource, params) => {
		const query = {
			...defaultQueryParams
		};
		return httpClient(`${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}/${params.id}?${stringify(query)}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},

	updateMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
			...defaultQueryParams
		};
		return httpClient(`${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}?${stringify(query)}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},

	create: (resource, params) => {
		const query = {
			...defaultQueryParams
		};
		return httpClient(`${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}?${stringify(query)}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		}));
	},

	delete: (resource, params) => {
		const query = {
			...defaultQueryParams
		};
		return httpClient(`${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}/${params.id}?${stringify(query)}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json }));
	},

	deleteMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
			...defaultQueryParams
		};
		return httpClient(`${API_ADDRESS}/${starndardizeTMDBHorrendousRestResources(resource, params)}?${stringify(query)}`, {
			method: 'DELETE',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},
};