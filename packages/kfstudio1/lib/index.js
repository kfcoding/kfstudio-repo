import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Store } from './stores';
import { Provider } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';

const store = Store.create({
});


onSnapshot(store, (snapshot) => {
  console.dir(snapshot)
})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
