import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PastriesComponent } from './Pastries';

configure({ adapter: new Adapter() });

describe(`Component Pastries`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<PastriesComponent />);
    expect(component).toBeTruthy();
  });
});
