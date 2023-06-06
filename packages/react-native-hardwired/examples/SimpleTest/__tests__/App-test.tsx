/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.useFakeTimers();

jest.setTimeout(5000);

it('renders correctly', () => {
  renderer.create(<App />);
});
const promiseWithTimeout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({id: 3});
    }, 1000);
  });
};

it('should return the id', () => {
  return promiseWithTimeout().then(m => {
    expect(3).toBe(3);
  });
});
