import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import {library} from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'


const IconList = Object
      .keys(Icons)
      .filter(key => key !== "fas" && key !== "prefix")
      .map(icon => Icons[icon])

library.add(...IconList)

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)



root.render(
  <React.Fragment>
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    
  </React.Fragment>
);


