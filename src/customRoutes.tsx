import React from 'react';
import { Route } from 'react-router-dom';
import { ChartsMain } from "./charts";

export default [
    <Route exact path="/charts" component={ChartsMain} />
];