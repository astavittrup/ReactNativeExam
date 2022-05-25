import React from "react";
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import {StyleSheet} from 'react-native';

import NavigationComponent from './components/Navigation';
import chatReducer from './store/reducers/ChatReducer';
import userReducer from "./store/reducers/UserReducer";
import User from "./entities/user";

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
})

// redux state - typescript
export type RootState = ReturnType<typeof rootReducer>

// redux
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
      <NavigationComponent navigation={undefined} />
    </Provider>
    
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


