import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Gnomes from '../../containers/Gnomes';
import Gnome from '../../containers/Gnome';
import Welcome from '../../containers/Welcome';
import '../../App.scss';

const LayoutManager = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/home/" component={Gnomes} toggleFilter/>
        <Route path="/gnomes/:id" component={Gnome} />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default LayoutManager;
