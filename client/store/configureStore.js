import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
import usersSaga from '../sagas/users';
import userSaga from '../sagas/user';
import groupsSaga from '../sagas/groups';
import groupSaga from '../sagas/group';

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
    sagaMiddleware.run(usersSaga);
    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(groupsSaga);
    sagaMiddleware.run(groupSaga);

    return store;
};



