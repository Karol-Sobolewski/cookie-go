import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CakesComponent } from './Cakes';

configure({ adapter: new Adapter() });

describe(`Component Cakes`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<CakesComponent />);
    expect(component).toBeTruthy();
  });
});
