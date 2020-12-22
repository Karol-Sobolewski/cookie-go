import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SingleProductPageComponent } from './SingleProductPage';

configure({ adapter: new Adapter() });

describe(`Component SingleProductPage`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<SingleProductPageComponent />);
    expect(component).toBeTruthy();
  });
});
