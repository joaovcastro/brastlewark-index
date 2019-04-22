import React from 'react';
import { shallow } from 'enzyme';

import Navigation from './Navigation';

describe('<Navigation />', () => {
  it('correctly renders', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper).toMatchSnapshot();
  });
});
