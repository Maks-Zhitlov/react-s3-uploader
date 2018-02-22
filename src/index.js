import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';
import './style.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Example/>, document.getElementById('root'));
registerServiceWorker();
