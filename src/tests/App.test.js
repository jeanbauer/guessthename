import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render, mount } from 'enzyme';
import App from '../containers/App';
import Header from '../components/Header';
import Levenshtein from '../utils/Levenshtein';
import Button from '../components/Button';

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Header with low progress without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header progress={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('using Levenshtein algorithm it returns 2 for two different letters', () => {
  expect(Levenshtein('Jean', 'Geam')).toEqual(2);
});