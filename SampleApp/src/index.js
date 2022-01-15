import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectI18NProvider } from "fz-i18n";
import configureStore from "./store/configureStore";
import AppContainer from "./containers/AppContainer";

window.mockServerURL = "";

const store = configureStore();
setTimeout(() => {
  console.log("Hello world");
  ReactDOM.render(
    <Provider store={store}>
      <ConnectI18NProvider
        direction={document.getElementsByTagName("html")[0].dir}
        i18n={() => {}}
        permission={{}}
        timeZone={(state) => ""}
        license={""}
      >
        <AppContainer />
      </ConnectI18NProvider>
    </Provider>,
    document.getElementById("container")
  );
}, 1);
