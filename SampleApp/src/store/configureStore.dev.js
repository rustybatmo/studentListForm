import { createBrowserHistory } from "history";
import { reduxRouter } from "redux-router-middleware";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "../middleware/PromiseMiddleware";
import rootReducer from "../reducers";

//import logger from "redux-logger";
//import { createLogger } from "redux-logger";
import { createLogger } from "redux-logger";
import DevTools from "../containers/DevTools";
import getUrls from "../appUrls";
import { historyChange } from "../historyChange";

const configureStore = (preloadedState) => {
  let history = createBrowserHistory();

  let { historyMiddleware, routing } = reduxRouter(
    history,
    getUrls(),
    historyChange
  );

  //console.log(createLogger);
  let middleWare = compose(
    applyMiddleware(
      thunk,
      promiseMiddleware,
      historyMiddleware,
      createLogger({ collapsed: true })
    ),
    DevTools.instrument()
  );

  const store = createStore(
    combineReducers(Object.assign(rootReducer, { routing })),
    preloadedState,
    middleWare
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
