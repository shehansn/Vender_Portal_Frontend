import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Editproduct from "./page/Editproduct";
import Favouriteproducts from "./page/Favouriteproducts";
import Home from "./page/Home";
import Newproduct from "./page/Newproduct";
import SearchResult from "./page/SearchResult";
import { store } from "./redux/index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="addProduct" element={<Newproduct />} />
      <Route path="editProduct/:productId" element={<Editproduct />} />
      <Route path="favProducts" element={<Favouriteproducts />} />
      <Route path="searchProduct/:productName" element={<SearchResult />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
