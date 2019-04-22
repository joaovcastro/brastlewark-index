import React, { Component } from 'react';
import styled from 'styled-components';
import { mapKeys } from 'lodash';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { Button, Grid, Typography } from '@material-ui/core';
import { func, object, bool, number } from 'prop-types';
import fetchGnomes from '../../actions/fetchGnomes';
import InfoCard from '../../components/InfoCard';
import Filter from '../../components/Filter';
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import { getHairColors, getProfessions } from './utils';

const ContentWrapper = styled.div`
  margin-top: 100px;
`;

const ListWrapper = styled.div`
  width: 70%;
  margin-left: 15%;
  transition: all 200ms ease-in;
  margin-top: ${props => props.marginTop}px;
`;

const ButtonContainer = styled(Grid)`
  padding: 30px 0;
  button {
    height: 65px;
  }
`;

const CustomNavigation = styled(Navigation)`
  top: 0;
`;

const getMargin = showFilter => (showFilter ? 330 : 0);

class Gnomes extends Component {
  componentDidMount() {
    this.props.location?.state?.filter
      ? this.props.fetchGnomes(this.props.location.state.filter.profession)
      : this.props.fetchGnomes();
  }

  render() {
    if (this.props.reducer.isFetching) {
      return <Loading />;
    }
    const {
      showFilter,
      toggleFilter,
      updateFilterValues,
      filtered,
      limit,
      onShowMoreButtonClick,
      onShowAllButtonClick,
      setFullList,
      fullList,
    } = this.props;

    if (!fullList) setFullList(this.props.reducer.content?.Brastlewark);

    const professions = getProfessions(this.props.reducer.content?.Brastlewark);
    const hairColors = getHairColors(this.props.reducer.content?.Brastlewark);
    const showList =
      filtered?.slice(0, limit) ||
      this.props.reducer.content?.Brastlewark.slice(0, limit);

    return (
      <ContentWrapper>
        <CustomNavigation toggleFilter={toggleFilter} showFilter />
        <Filter
          open={showFilter}
          toggle={toggleFilter}
          onFilter={updateFilterValues}
          professions={professions}
          hairColors={hairColors}
        />
        <ListWrapper slide={showFilter} marginTop={getMargin(showFilter)}>
          <Grid container spacing={24}>
            {showList && showList.length ? (
              showList.map(listItem => {
                return (
                  <Grid item key={listItem.name} lg={3} md={4} sm={6} xs={12}>
                    <InfoCard info={listItem} />
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  paragraph
                  style={{ marginTop: '30px' }}
                >
                  No Gnomes found
                </Typography>
                <Typography variant="h4">Please try again.</Typography>
              </Grid>
            )}
            <ButtonContainer
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={16}
            >
              <Grid item md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#658361' }}
                  onClick={onShowMoreButtonClick}
                >
                  Show 8 More
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ color: 'white', backgroundColor: '#C4D392' }}
                  onClick={() =>
                    onShowAllButtonClick(
                      this.props.reducer.content?.Brastlewark.length || 10,
                    )
                  }
                >
                  Show All
                </Button>
              </Grid>
            </ButtonContainer>
          </Grid>
        </ListWrapper>
      </ContentWrapper>
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
    fetchGnomes: function(profession) {
      dispatch(fetchGnomes(profession));
    },
  };
}

Gnomes.propTypes = {
  fetchGnomeInfo: func,
  history: object.isRequired,
  location: object.isRequired,
  match: object.isRequired,
  reducer: object.isRequired,
  showFilter: bool.isRequired,
  toggleFilter: func.isRequired,
  updateFilterValues: func,
  filterOptions: object,
  onShowMoreButtonClick: func,
  onShowAllButtonClick: func,
  filter: object,
  limit: number,
};

Gnomes.defaultProps = {
  fetchGnomeInfo: () => [],
  updateFilterValues: () => false,
  onShowMoreButtonClick: () => false,
  onShowAllButtonClick: () => false,
  filterOptions: {},
};

export default compose(
  withStateHandlers(
    {
      showFilter: false,
      fullList: undefined,
      fitlered: null,
      limit: 8,
      filterOptions: {
        name: undefined,
        professions: undefined,
        hair_color: undefined,
        height: undefined,
        weight: undefined,
      },
    },
    {
      setFullList: () => list => ({ fullList: list }),
      toggleFilter: ({ showFilter }) => () => ({ showFilter: !showFilter }),
      updateFilterValues: ({ fullList, filtered, filterOptions }) => filter => {
        const { field, value } = filter;
        const newValue = value === 'All' ? undefined : value;
        const newFilter = Object.assign({}, filterOptions, {
          [field]: [newValue][0],
        });
        filtered = fullList;

        mapKeys(newFilter, (value, key) => {
          if (value && value !== 'All') {
            console.log('testing', key, value);
            if (field === 'height' || field == 'weight') {
              const [min, max] = value;
              filtered = filtered.filter(
                o => o[key] && o[key] >= min && o[key] <= max,
              );
            } else if (key.toLowerCase() === 'professions') {
              filtered = filtered.filter(o => o[key].includes(value));
            } else {
              filtered = filtered.filter(
                o =>
                  o[key] && o[key].toLowerCase().includes(value.toLowerCase()),
              );
            }
          }
        });
        return { filterOptions: newFilter, filtered };
      },
      onShowMoreButtonClick: ({ limit }) => () => ({ limit: limit + 8 }),
      onShowAllButtonClick: () => newLimit => ({ limit: newLimit }),
    },
  ),
)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Gnomes),
);
