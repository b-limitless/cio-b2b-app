import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={Store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
  root
);
