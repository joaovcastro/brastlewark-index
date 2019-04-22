import { createMockStore } from 'redux-test-utils';
import React from 'react';
import { shallow } from 'enzyme';
import Gnome from './Gnome';

describe('<Gnome />', () => {
  it('correctly renders', () => {
    const info = {
      id: '1',
      name: 'first last',
      friends: [],
      professions: [],
    };

    const store = createMockStore(info);

    const wrapper = shallow(<Gnome store={store} info={info} />);
    expect(wrapper).toMatchSnapshot();
  });
});
