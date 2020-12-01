import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HeaderComponent } from './Header';

configure({ adapter: new Adapter() });

describe(`Component Header`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<HeaderComponent />);
    expect(component).toBeTruthy();
  });
});
