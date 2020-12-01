import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LogoComponent } from './Logo';

configure({ adapter: new Adapter() });

describe(`Component Logo`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<LogoComponent />);
    expect(component).toBeTruthy();
  });
});
