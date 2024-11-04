import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js"; // Import the configured Redux store
import ErrorBoundary from "./ErrorBoundary.jsx";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51QElDnLmEtYq2UbDzpKU7VAR1ZVPbnKsYb9Gm1OZ60FiscLjmk7Sk88XvVhJJVwisO2H9b5NXyKCx0Olpl7AUhao00wcjgnTpp"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          {" "}
          {/* Wrap the app with Elements */}
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Elements>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
