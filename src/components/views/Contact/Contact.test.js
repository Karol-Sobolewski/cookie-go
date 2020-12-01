import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ContactComponent } from './Contact';

configure({ adapter: new Adapter() });

describe(`Component Contact`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ContactComponent />);
    expect(component).toBeTruthy();
  });
});
