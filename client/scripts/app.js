
import 'babel-polyfill';
import '../styles/app.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Root from '../../universal/components/Root';

ReactDOM.render(<Root />, document.getElementById('root'));
