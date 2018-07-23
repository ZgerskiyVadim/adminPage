import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();


export const configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension
                ? window.devToolsExtension()
                : (f) => f
        )
    );
    sagaMiddleware.run(rootSaga);

    return store;
};



