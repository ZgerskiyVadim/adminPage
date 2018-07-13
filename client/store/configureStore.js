import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
import mySaga from '../sagas';

export const configureStore = () => {
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension
                ? window.devToolsExtension()
                : (f) => f
        )
    );
    sagaMiddleware.run(mySaga);
    return store;
};



