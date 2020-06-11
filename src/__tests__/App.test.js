import React, {Component, createElement} from 'react';
import { render } from '@testing-library/react';
import { shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import { createRenderer } from 'react-dom/test-utils';

// test('renders learn react link', () => {
//   const { getByText } = render(<A.0pp />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

configure({ adapter: new Adapter() })

test("test previous week change", () => {
  const wrapper = shallow(<App/>)
  wrapper.instance().previousWeek();
  expect(wrapper.state('min_date')).toBe('2019-06-17')
})
