import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
describe('App', () => {
  test('Component render app', () => {
    const app = shallow(
        <App/>
    );
    expect(app.length).toEqual(1);
  });
});
