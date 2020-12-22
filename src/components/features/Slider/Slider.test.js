import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SliderComponent } from './Slider';

configure({ adapter: new Adapter() });

describe(`Component Slider`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<SliderComponent />);
    expect(component).toBeTruthy();
  });
});
