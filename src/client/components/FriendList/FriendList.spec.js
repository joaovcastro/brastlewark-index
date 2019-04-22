import React from 'react';
import { shallow } from 'enzyme';

import FriendList from './FriendList';

describe('<FriendList />', () => {
  it('correctly renders', () => {
    const wrapper = shallow(<FriendList list={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
