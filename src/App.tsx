import React from "react";
import { Admin, Resource, } from "react-admin";
import dataProvider from "./dataProvider";
import Movie from "./models/movies";
import customRoutes from "./customRoutes";
import { Menu, Layout } from "./layout";

const App = () => (
	<Admin layout={Layout} customRoutes={customRoutes} dataProvider={dataProvider}>
		<Resource {...Movie} />
		<Resource name="movieGenre" />
	</Admin>
);

export default App;
