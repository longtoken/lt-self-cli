import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {Icon} from 'antd-mobile';
import createHistory from 'history/createHashHistory';

const history = createHistory();
//console.log(Router);
//console.log(history);

import App from 'containers';

import Loadable from 'react-loadable';
const MyLoadingComponent = ({isLoading, error}) => {
  if (isLoading) { // Handle the loading state
    return <Icon type="loading"/>;
  } else if (error) { // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
  loading: MyLoadingComponent
})
;
const AsyncUser = Loadable({
    loader: () => import('../containers/User'),
  loading: MyLoadingComponent
})
;
const AsyncNotFound = Loadable({
    loader: () => import('../containers/404'),
  loading: MyLoadingComponent
})
;

class RouteMap extends Component {
  render() {
    return (
      <Router history={history}>
        <App>
          <Switch>
            <Route path="/" exact component={AsyncHome}/>
            <Route path="/user" component={AsyncUser}/>
            <Route component={AsyncNotFound}/>
          </Switch>
        </App>
      </Router>
    );
  }
}

export default RouteMap;