import React from 'react';
import ReactDOM from 'react-dom';
import ButtonProgress from './ButtonProgress';

fit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonProgress />, div);
});