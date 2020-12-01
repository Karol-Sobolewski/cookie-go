import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HomePageComponent } from './HomePage';

configure({ adapter: new Adapter() });

describe(`Component HomePage`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<HomePageComponent />);
    expect(component).toBeTruthy();
  });
});
