import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import "@fontsource/roboto";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import { store } from "./store";
import theme, { ToastContainer } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider
        theme={theme}
        toastOptions={{ defaultOptions: { isClosable: true } }}
      >
        <ToastContainer />
        <Provider store={store}>
          <Router />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
