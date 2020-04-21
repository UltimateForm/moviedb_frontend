import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from "./dataProvider";
import Movie from "./models/movies";

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource {...Movie}/>
        <Resource name="movieGenre"/>
    </Admin>
);

export default App;