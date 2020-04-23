import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import dataProvider from "./dataProvider";
import Movie from "./models/movies";
import customRoutes from "./customRoutes";
import { Menu } from "./layout";

const App = () => (
	<Admin menu={Menu} customRoutes={customRoutes} dataProvider={dataProvider}>
		<Resource {...Movie} />
		<Resource name="movieGenre" />
	</Admin>
);

export default App;
