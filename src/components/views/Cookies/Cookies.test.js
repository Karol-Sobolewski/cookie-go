import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CookiesComponent } from './Cookies';

configure({ adapter: new Adapter() });

describe(`Component Cookies`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<CookiesComponent />);
    expect(component).toBeTruthy();
  });
});
