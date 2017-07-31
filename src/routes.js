import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App, Home,
  NotFound
} from 'containers';

/**
 * Please keep routes in alphabetical order
 */
export default (/* store */) =>
  <Route path="/" component={App}>
    {/* Home (main) route */}
    <IndexRoute component={Home} />

    {/* Routes */}
    {/* <Route path="example" component={Example} /> */}

    {/* Catch all route */}
    <Route path="*" component={NotFound} status={404} />
  </Route>;
