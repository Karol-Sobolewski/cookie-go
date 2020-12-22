import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductsPageComponent } from './ProductsPage';

configure({ adapter: new Adapter() });

describe(`Component ProductsPage`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ProductsPageComponent />);
    expect(component).toBeTruthy();
  });
});
