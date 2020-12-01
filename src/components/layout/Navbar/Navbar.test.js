import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NavbarComponent } from './Navbar';

configure({ adapter: new Adapter() });

describe(`Component Navbar`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<NavbarComponent />);
    expect(component).toBeTruthy();
  });
});
