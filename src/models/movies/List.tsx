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
	ChipField
} from "react-admin";
import { DiscoverMoviesFilter } from "./ListFilters";

const MovieList = (props: any) => (
	<List {...props} filters={<DiscoverMoviesFilter />} perPage={20}>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<TextField source="title" />
			<NumberField source="popularity" />
			{/*             <NumberField source="vote_count" />
            <BooleanField source="video" />
            <TextField source="poster_path" /> 
			<BooleanField source="adult" />*/}
			{/*             <TextField source="backdrop_path" />
            <TextField source="original_language" />
            <TextField source="original_title" /> */}
			<ReferenceArrayField source="genre_ids" reference="movieGenre">
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<NumberField source="vote_average" />
			<TextField source="overview" />
			<DateField source="release_date" />
		</Datagrid>
	</List>
);

export default MovieList;
