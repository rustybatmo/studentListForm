import { createBrowserHistory } from "history";
import { reduxRouter } from "@zohodesk/router-middleware";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { historyChange } from "../historyChange";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const configureStore = preloadedState => {
  let history = createBrowserHistory();

  let { historyMiddleware, routing } = reduxRouter(
    history,
    getUrls(),
    historyChange
  );

  let middleWare = compose(applyMiddleware(thunk, historyMiddleware));

  return createStore(
    combineReducers(Object.assign(rootReducer, { routing })),
    preloadedState,
    middleWare
  );
};

export default configureStore;

