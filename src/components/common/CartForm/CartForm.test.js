import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CartFormComponent } from './CartForm';

configure({ adapter: new Adapter() });

describe(`Component CartForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<CartFormComponent />);
    expect(component).toBeTruthy();
  });
});
