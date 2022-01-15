import {
  push as routerPush,
  replace as routerReplace
} from "redux-router-middleware";

export function push(obj, isHref) {
  //obj.pathname = isHref ? obj.pathname : URL_PREFIX + obj.pathname;
  return (dispatch, getState) => {
    let state = getState();
    dispatch(routerPush(obj));
  };
}

export function replace(obj) {
  return (dispatch, getState) => {
    let state = getState();
    if (
      !state.routing.location ||
      obj.href !== state.routing.location.pathname
    ) {
      let locationState =
        state.routing.location && state.routing.location.state;
      if (!obj.state && locationState) {
        obj.state = {};
        Object.assign(obj.state, locationState);
      }
      dispatch(routerReplace(obj));
    }
  };
}

export function showAlert(data) {
  return {
    type: "ALERT_SHOW",
    data
  };
}

export function hideAlert() {
  return {
    type: "ALERT_HIDE"
  };
}

export const alertAction = (() => {
  let ob = { resolve: null, reject: null };
  function showConfirmBox(data) {
    return dispatch =>
      new Promise((res, rej) => {
        ob.resolve = () => {
          dispatch(hideAlert());
          res();
        };
        ob.reject = () => {
          dispatch(hideAlert());
          rej();
        };
        dispatch(showAlert(data));
      });
  }
  return {
    ob,
    showConfirmBox
  };
})();
