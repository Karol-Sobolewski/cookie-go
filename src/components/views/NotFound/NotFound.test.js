import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NotFoundComponent } from './NotFound';

configure({ adapter: new Adapter() });

describe(`Component NotFound`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<NotFoundComponent />);
    expect(component).toBeTruthy();
  });
});
