import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SweetsComponent } from './Sweets';

configure({ adapter: new Adapter() });

describe(`Component Sweets`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<SweetsComponent />);
    expect(component).toBeTruthy();
  });
});
