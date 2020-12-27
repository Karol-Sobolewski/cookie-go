import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AddToCartFormComponent } from './AddToCartForm';

configure({ adapter: new Adapter() });

describe(`Component AddToCartForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<AddToCartFormComponent />);
    expect(component).toBeTruthy();
  });
});
