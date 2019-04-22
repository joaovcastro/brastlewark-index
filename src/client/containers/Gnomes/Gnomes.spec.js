import { createMockStore } from 'redux-test-utils';
import React from 'react';
import { shallow } from 'enzyme';

import Gnomes from './Gnomes';

describe('<Gnomes />', () => {
  it('correctly renders', () => {
    const info = {};
    const store = createMockStore(info);

    const wrapper = shallow(<Gnomes store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});
