import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import Navigation from '../../components/Navigation';
import Loading from '../../components/Loading';
import FriendList from '../../components/FriendList';
import {
  Grid,
  CardMedia,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import fetchGnomeInfo from '../../actions/fetchGnomeInfo';

const ContentWrapper = styled(Card)`
  width: 70%;
  margin-left: 15%;
  min-height: cal(100vh - 100px);
  padding: 30px 100px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Color = styled(Grid)`
  margin: 10px 0 10px calc(50% - 30px) !important;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  background: ${props => props.color};
`;

const Content = styled.div`
  margin-top: 90px;
  line-height: 2em;
`;

const CustomTypography = styled(Typography)`
  color: #3a5637 !important;
`;

const getYear = year => new Date().getFullYear() - Number(year);

class Gnome extends Component {
  componentDidMount() {
    this.props.fetchGnomeInfo(this.props.match.params.id);
  }

  render() {
    if (this.props.reducer.isFetching || !this.props.reducer.content) {
      return <Loading />;
    }
    const info = this.props.reducer.content;
    const { friends } = info;
    return (
      <Content>
        <Navigation />
        <ContentWrapper>
          <Grid container spacing={16} justify="space-evenly">
            <Grid item md={12}>
              <CustomTypography gutterBottom variant="h3">
                {info.name}
              </CustomTypography>
              <Divider />
            </Grid>

            <Grid item md={6}>
              <Card>
                <CardMedia
                  image={info.thumbnail}
                  title="Avatar"
                  style={{ height: '450px' }}
                />
              </Card>
            </Grid>

            <Grid item md={6} style={{ paddingLeft: '20px' }}>
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                spacing={16}
              >
                <Grid item md={6}>
                  <CardContent>
                    <Grid item md={12}>
                      <CustomTypography gutterBottom variant="h5">
                        Age
                      </CustomTypography>
                    </Grid>
                    <Divider />
                    <Grid item md={12}>
                      <Typography variant="p">{info.age}</Typography>
                    </Grid>
                    <Grid item md={12}>
                      <Typography variant="p">
                        Born in {getYear(info.age)}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Grid>
                <Grid item md={6}>
                  <CardContent>
                    <Grid item md={12}>
                      <CustomTypography gutterBottom variant="h5">
                        Hair Color
                      </CustomTypography>
                    </Grid>
                    <Divider />
                    <Color item md={12} color={info.hair_color.toLowerCase()} />
                    <Grid item md={12} style={{ textAlign: 'center' }}>
                      {info.hair_color}
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={6}>
                  <CardContent>
                    <Grid item xs={12}>
                      <CustomTypography gutterBottom variant="h5">
                        Weight
                      </CustomTypography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      {Math.floor(info.weight)} Kg
                    </Grid>
                  </CardContent>
                </Grid>
                <Grid item md={6}>
                  <CardContent>
                    <Grid item xs={12}>
                      <CustomTypography gutterBottom variant="h5">
                        Height
                      </CustomTypography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      {Math.floor(info.height)} cm
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
              {info.professions.length ? (
                <Grid container spacing={8}>
                  <CardContent>
                    <Grid item md={12}>
                      <CustomTypography gutterBottom variant="h5">
                        Professions
                      </CustomTypography>
                    </Grid>
                    <Divider />

                    <Grid item md={12} container>
                      {info.professions.map(profession => (
                        <Grid item sm={6} key={profession}>
                          <span key={profession}> {profession} </span>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Grid>
              ) : (
                <div />
              )}
            </Grid>
            <Grid container>
              {friends?.length > 0 && <FriendList list={friends} />}
            </Grid>
          </Grid>
        </ContentWrapper>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.gnomeInfoReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGnomeInfo: function(gnomeId) {
      dispatch(fetchGnomeInfo(gnomeId));
    },
  };
}

Gnome.propTypes = {
  fetchGnomeInfo: func,
  history: object,
  location: object,
  match: object,
  reducer: object,
};

Gnome.propTypes = {
  fetchGnomeInfo: () => false,
  history: () => {},
  location: () => {},
  match: () => {},
  reducer: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gnome);
