export default function promiseMiddleware({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      const { types, callAPI, shouldCallAPI = () => true, payload } = action;
      if (!types) {
        // Normal action: pass it o
        return next(action);
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.');
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected fetch to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        return Promise.resolve();
      }
      const [requestType, successType, failureType] = types;

      dispatch({
        type: requestType,
        data: typeof payload === 'function' ? payload(getState()) : payload
      });
      return callAPI(getState(), getState).then(
        response => {
          let action = dispatch(
            Object.assign(
              {},
              {
                data: response,
                type: successType
              }
            )
          );
          return action;
        },
        error => {
          dispatch(
            Object.assign(
              {},
              {
                data: error,
                type: failureType
              }
            )
          );
          throw error;
        }
      );
    };
  };
}
