import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AboutComponent } from './About';

configure({ adapter: new Adapter() });

describe(`Component About`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<AboutComponent />);
    expect(component).toBeTruthy();
  });
});
