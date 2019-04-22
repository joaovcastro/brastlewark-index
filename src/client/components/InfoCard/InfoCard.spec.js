import React from 'react';
import { shallow } from 'enzyme';

import InfoCard from './InfoCard';

describe('<InfoCard />', () => {
  it('correctly renders', () => {
    const info = {
      id: '1',
      name: 'first last',
      friends: [],
      professions: [],
    };

    const wrapper = shallow(<InfoCard info={info} />);
    expect(wrapper).toMatchSnapshot();
  });
});
