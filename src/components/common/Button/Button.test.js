import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ButtonComponent } from './Button';

configure({ adapter: new Adapter() });

describe(`Component Button`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ButtonComponent />);
    expect(component).toBeTruthy();
  });
});
