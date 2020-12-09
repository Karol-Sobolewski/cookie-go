import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CartComponent } from './Cart';

configure({ adapter: new Adapter() });

describe(`Component Cart`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<CartComponent />);
    expect(component).toBeTruthy();
  });
});
