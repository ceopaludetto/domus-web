import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import history from '../routes/history';
import reducers from './ducks/index';
import root from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];
const store = createStore(connectRouter(history)(reducers), applyMiddleware(...middlewares));

sagaMiddleware.run(root);

export default store;
