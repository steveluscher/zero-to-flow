// @flow strict-local

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import invariant from 'invariant';

import './index.css';

const mountPoint = document.getElementById('root');
invariant(
  mountPoint != null,
  'Could not find a place to mount the app. Check index.html.',
);
ReactDOM.render(<App />, mountPoint);
