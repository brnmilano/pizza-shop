import React from "react";
import ReactDOM from "react-dom/client";
import { enableMsw } from "./api/mocks";
import App from "./App";

enableMsw().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
