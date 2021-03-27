import * as React from "react";
import * as ReactDOM from "react-dom";
import { browser } from "webextension-polyfill-ts";
import Popup from "@src/ui/pages/Popup";
import {Provider} from "react-redux";
import configureAppStore from "@src/ui/store/configureAppStore";
import {MemoryRouter} from "react-router";

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  ReactDOM.render(
    <Provider store={configureAppStore()}>
      <MemoryRouter>
        <Popup />
      </MemoryRouter>
    </Provider>,
    document.getElementById("popup"),
  );
});