import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { {{pascalCase name}}Component } from './{{pascalCase name}}';

configure({adapter: new Adapter()});

describe(`Component {{pascalCase name}}`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<{{pascalCase name}}Component />);
    expect(component).toBeTruthy();
  });
});
