import { React } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NutritionTableComponent } from './NutritionTable';

configure({ adapter: new Adapter() });

describe(`Component NutritionTable`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<NutritionTableComponent />);
    expect(component).toBeTruthy();
  });
});
