import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { func, bool } from 'prop-types';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';

const NavBar = styled(AppBar)`
  z-index: 999999 !important;
  background-color: #658361 !important;
  padding: 0 100px;
  height: 90px !important;
`;

const WhiteButton = styled(Button)`
  color: white !important;
  border: 1px solid white !important;
  background-color: transparent !important;
  margin-top: 25px!important;
`;

const Navigation = ({ showFilter, toggleFilter }) => (
  <NavBar position="fixed">
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <Link to={{ pathname: `/home/` }}>
          <img src={logo} width="100" height="75" />
        </Link>
      </Grid>
      {showFilter && (
        <Grid item>
          <WhiteButton
            variant="outlined"
            color="secondary"
            onClick={toggleFilter}
          >
            Filter
          </WhiteButton>
        </Grid>
      )}
    </Grid>
  </NavBar>
);

Navigation.propTypes = {
  showFilter: bool,
  toggleFilter: func,
};

Navigation.defaultProps = {
  showFilter: false,
  toggleFilter: () => false,
};

export default Navigation;
