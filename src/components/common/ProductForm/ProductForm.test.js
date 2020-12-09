import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductFormComponent } from './ProductForm';

configure({ adapter: new Adapter() });

describe(`Component ProductForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ProductFormComponent />);
    expect(component).toBeTruthy();
  });
});
