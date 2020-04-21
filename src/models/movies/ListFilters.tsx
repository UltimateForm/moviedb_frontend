import React from "react";
import {
	Filter,
	TextInput,
	NumberInput,
	BooleanInput,
	DateInput,
} from "react-admin";

export const DiscoverMoviesFilter = (props: any) => {
	return (
		<Filter {...props}>
			<TextInput label="Search" source="search" alwaysOn/>
			{/* <TextInput source="language" alwaysOn={false}/>*/}
			<TextInput source="language" alwaysOn={false} />
			{/* <NumberInput label="Year" source="year" alwaysOn={false} />*/}
			<NumberInput source="primary_release_year" alwaysOn={false} />

		</Filter>
	);
};
