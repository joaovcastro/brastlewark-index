import React from 'react';
import { shallow } from 'enzyme';

import Filter from './Filter';

describe('<Filter />', () => {
  it('correctly renders', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper).toMatchSnapshot();
  });
});
