import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "@src/App";

import { store } from "@src/app/store";

import "@src/index.css";
import "animate.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
