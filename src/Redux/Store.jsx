import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import DashboardReducer from "./Reducers/DashboardReducer";
import FetchDataSaga from "./Sagas/FetchDataSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  data: DashboardReducer, 
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(FetchDataSaga);

export default store;
