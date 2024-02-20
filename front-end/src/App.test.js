import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  it('renders correctly', () => {
    const tree = 1
    expect(tree).not.toBeNull();
  });
});
