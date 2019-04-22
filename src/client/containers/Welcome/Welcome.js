import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';
import { withTheme, createMuiTheme } from '@material-ui/core/styles';
import { func, object, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, withStateHandlers } from 'recompose';
import styled from 'styled-components';
import fetchGnomes from '../../actions/fetchGnomes';
import Loading from '../../components/Loading';
import background from '../../assets/bg.jpeg';

const Content = styled(Grid)`
  position: fixed;
  text-align: center;
`;

const CraftSelect = styled(Select)`
  border: none;
  color: white !important;
  font-size: 37px !important;
  line-height: 0 !important;
  padding: 0 !important;

  > div > div {
    min-height: 15px !important;
    overflow: visible !important;
  }
  svg {
    color: white;
  }

  &::before,
  &::after {
    border-bottom: 1px solid white !important;
  }
`;

const HeadingText = styled(Typography)`
  color: white !important;

  a {
    color: white;
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CustomButton = styled(Button)`
  color: white !important;
  border: 1px solid white !important;
  background-color: transparent !important;
  height: 65px;
  font-size: 20px !important;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${props =>
    props.background}') no-repeat center center;
`;

const Spacing = styled.div`
  height: 50vh;
  width: 100vw;
`;

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Welcome extends Component {
  getProfessions = () => {
    const result = [];
    if (this.props.reducer.content && this.props.reducer.content.Brastlewark) {
      const array = this.props.reducer.content.Brastlewark;
      const map = new Map();
      for (const item of array) {
        item.professions.map(prof => {
          if (!map.has(prof)) {
            map.set(prof, true);
            result.push({
              name: prof,
            });
          }
        });
      }
    }
    return result;
  };

  componentDidMount() {
    this.props.fetchGnomes(this.props.reducer.content);
  }

  render() {
    if (this.props.reducer.isFetching) {
      return <Loading />;
    }
    const { profession, setProfession } = this.props;
    const professions = this.getProfessions(this.props.reducer);
    return (
      <Wrapper background={background}>
        <Spacing />
        <Content container direction="row" justify="center">
          <Grid container spacing={16} alignItems="flex-end">
            <Grid item md={12}>
              <HeadingText
                variant="h1"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                }}
              >
                Brastlewark Index
              </HeadingText>
            </Grid>
            <Grid item md={6} style={{ textAlign: 'right' }}>
              <HeadingText variant="h3">I need a</HeadingText>
            </Grid>

            <Grid item md={6} style={{ textAlign: 'left', marginTop: '30px' }}>
              <FormControl>
                <CraftSelect
                  value={profession}
                  onChange={setProfession}
                  inputProps={{
                    name: 'profession',
                  }}
                  style={{ minWidth: '300px' }}
                >
                  {professions.map(prof => (
                    <MenuItem value={prof.name} key={prof.name}>
                      {prof.name}
                    </MenuItem>
                  ))}
                </CraftSelect>
              </FormControl>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ textAlign: 'center', margin: '50px 0' }}
            >
              <Grid item md={3}>
                <Link
                  to={{
                    pathname: `/home/`,
                    state: {
                      filter: { profession },
                    },
                  }}
                >
                  <CustomButton fullWidth variant="outlined" size="medium">
                    Search
                  </CustomButton>
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item md={12} style={{ textalign: 'center' }}>
                <HeadingText variant="h5">
                  {`Or just `}
                  <Link
                    to={{
                      pathname: `/home/`,
                    }}
                  >
                    browse our index
                  </Link>
                </HeadingText>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.gnomesReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGnomes: function() {
      dispatch(fetchGnomes());
    },
  };
}

Welcome.propTypes = {
  fetchGnomeInfo: func.isRequired,
  history: object.isRequired,
  location: object.isRequired,
  match: object.isRequired,
  reducer: object.isRequired,
  profession: string.isRequired,
};

export default compose(
  withStateHandlers(
    { profession: '' },
    {
      setProfession: () => e => ({ profession: e.target.value }),
    },
  ),
)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Welcome),
);
