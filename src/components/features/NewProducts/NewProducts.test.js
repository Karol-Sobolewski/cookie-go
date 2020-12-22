import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NewProductsComponent } from './NewProducts';

configure({ adapter: new Adapter() });

describe(`Component NewProducts`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<NewProductsComponent />);
    expect(component).toBeTruthy();
  });
});
