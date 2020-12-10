import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ResponsiveMenuComponent } from './ResponsiveMenu';

configure({ adapter: new Adapter() });

describe(`Component ResponsiveMenu`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ResponsiveMenuComponent />);
    expect(component).toBeTruthy();
  });
});
