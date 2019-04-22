import React from 'react';
import {
  Grid,
  FormControl,
  TextField,
  FormLabel,
  Select,
} from '@material-ui/core';
import { compose, withStateHandlers } from 'recompose';
import Range from 'rc-slider/lib/Range';
import Drawer from '@material-ui/core/Drawer';
import { func, array, bool } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70%;
  margin-left: 15%;
  padding-top: 110px;
  z-ndex: 10;
  height: 300px;
`;

const CustomSelect = styled(Select)`
  &::after {
    border-bottom: 1px solid #658361 !important;
  }
`;

const CustomTextField = styled(TextField)`
  &::after,
  &::before {
    border-bottom: 2px solid #658361 !important;
  }
`;

const Filter = ({
  onFilter,
  professions,
  hairColors,
  open,
  toggle,
  weight,
  height,
  setHeight,
  setWeight,
}) => {
  if (!professions || !hairColors) return <div />;
  return (
    <Drawer
      anchor="top"
      variant="persistent"
      open={open}
      onClose={toggle}
      transitionDuration={{
        enter: 250,
        exit: 200,
      }}
    >
      <Wrapper
        tabIndex={0}
        role="button"
        onKeyDown={key => {
          key.keyCode === 27 && toggle();
        }}
      >
        <form noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={24}
          >
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel component="legend">Name</FormLabel>
                <CustomTextField
                  style={{ margin: 8 }}
                  fullWidth
                  autoFocus
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={event =>
                    onFilter({ field: 'name', value: event.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl fullWidth>
                <FormLabel component="legend">Hair Color</FormLabel>
                <CustomSelect
                  native
                  onChange={e =>
                    onFilter({
                      field: 'hair_color',
                      value: event.target.value,
                    })
                  }
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option key="all">All</option>
                  {hairColors.map(item => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl fullWidth>
                <FormLabel component="legend">Profession</FormLabel>
                <CustomSelect
                  native
                  onChange={e =>
                    onFilter({ field: 'professions', value: e.target.value })
                  }
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option key="all">All</option>
                  {professions.map(prof => (
                    <option key={prof.name}>{prof.name}</option>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel component="legend">Height</FormLabel>
                <Range
                  max={200}
                  defaultValue={height}
                  onChange={event => {
                    setHeight(event);
                    onFilter({ field: 'height', value: event });
                  }}
                />
                <FormLabel component="legend" style={{ marginTop: '10px ' }}>
                  {`Between ${height[0]} and ${height[1]}`}
                </FormLabel>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel component="legend">Weight</FormLabel>
                <Range
                  max={100}
                  defaultValue={weight}
                  onChange={event => {
                    setWeight(event);
                    onFilter({ field: 'weight', value: event });
                  }}
                />
                <FormLabel component="legend" style={{ marginTop: '10px ' }}>
                  {`Between ${weight[0]} and ${weight[1]}`}{' '}
                </FormLabel>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </Drawer>
  );
};

Filter.propTypes = {
  onFilter: func,
  professions: array,
  hairColors: array,
  open: bool,
  toggle: func,
};

Filter.defaultProps = {
  open: false,
  toggle: () => false,
  onFilter: () => false,
  professions: [],
  hairColors: [],
};

export default compose(
  withStateHandlers(
    {
      weight: [30, 80],
      height: [40, 180],
    },
    {
      setWeight: () => value => ({ weight: value }),
      setHeight: () => value => ({ height: value }),
    },
  ),
)(Filter);
