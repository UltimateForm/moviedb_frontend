import React from "react";
import {
	NumberField,
	BooleanField,
	TextField,
	ReferenceArrayField,
	DateField,
	Datagrid,
	List,
	SingleFieldList,
	ChipField,
} from "react-admin";
import { DiscoverMoviesFilter } from "./ListFilters";
import DetailsDrawer from "./DetailsDialog";

const MovieList = (props: any) => {
	const { location, basePath, resource, history } = props;
	return (
		<>
			<List {...props}  sort={{ field: 'popularity', order: 'DESC' }} filters={<DiscoverMoviesFilter />} perPage={20}>
				<Datagrid rowClick="show">
					<TextField source="id" />
					<TextField source="title" />
					<NumberField source="popularity" />

					<ReferenceArrayField
						source="genre_ids"
						reference="movieGenre"
					>
						<SingleFieldList>
							<ChipField source="name" />
						</SingleFieldList>
					</ReferenceArrayField>
					<NumberField source="vote_average" />
					<TextField source="overview" />
					<DateField source="release_date" />
				</Datagrid>
			</List>
			<DetailsDrawer {...props}/>
		</>
	);
};

export default MovieList;
