// import './App.css'
import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { CartProvider } from "./utils/CartContext";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/productsPages/Products";
import ProductDetail from "./pages/productsPages/ProductDetail";
import ShortDetail from "./pages/productsPages/ShortDetail";
import Terms from "./pages/footerPages/Terms";
import Faqs from "./pages/footerPages/Faqs";
import Shorts from "./pages/productsPages/Shorts";
import ClassicJerseys from "./pages/productsPages/ClassicJerseys";
import ClassicJerseysDetail from "./pages/productsPages/ClassicJerseysDetail";
import UpdateCurrentJerseys from "./pages/admin/UpdateCurrentJerseys";
import UpdateUsers from "./pages/admin/UpdateUsers";
import UpdateClassicJerseys from "./pages/admin/UpdateClassicJerseys";
import UpdateShorts from "./pages/admin/UpdateShorts";
import EditClassicJerseys from "./pages/admin/EditClassicJerseys";
import PrivacyPolicy from "./pages/footerPages/PrivacyPolicy";
import Returns from "./pages/footerPages/Returns";
import EditUsers from "./pages/admin/EditUsers";
import EditCurrentJerseys from "./pages/admin/EditCurrentJerseys";
import EditShorts from "./pages/admin/EditShorts";
import ProductNavigation from "./components/ProductNavigation";
import AuthForm from "./components/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { tokenLoader } from "./utils/auth";
import { action as authAction } from "./components/AuthForm";
import { action as logoutAction } from "./components/LogOut";
import UserDetails from "./pages/UserDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: tokenLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {path : "cart" , element :<Cart />},
      {
        path: "products",
        element: (
          <>
            <ProductNavigation />
            <Outlet />
          </>
        ),
        children: [
          { path: "", element: <Products /> },
          { path: "productsShorts", element: <Shorts /> },
          { path: "productsClassicJerseys", element: <ClassicJerseys /> },
        ],
      },
      { path: "productsShorts/:id", element: <ShortDetail /> },
      { path: "productsJerseys/:id", element: <ProductDetail /> },
      {
        path: "productsClassicJerseys/:id",
        element: <ClassicJerseysDetail />,
      },
      { path: "terms", element: <Terms /> },
      { path: "privacyPolicy", element: <PrivacyPolicy /> },
      { path: "faqs", element: <Faqs /> },
      { path: "returns", element: <Returns /> },
      { path: "auth", element: <AuthForm />, action: authAction },

      ///admin routes
      {
        path: "updateCurrentJerseys",
        element: (
          <ProtectedRoute role="admin">
            <UpdateCurrentJerseys />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateClassicJerseys",
        element: (
          <ProtectedRoute role="admin">
            <UpdateClassicJerseys />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateShorts",
        element: (
          <ProtectedRoute role="admin">
            <UpdateShorts />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateUsers",
        element: (
          <ProtectedRoute role="admin">
            <UpdateUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "editClassicJerseys",
        element: (
          <ProtectedRoute role="admin">
            <EditClassicJerseys />
          </ProtectedRoute>
        ),
      },
      {
        path: "editCurrentJerseys",
        element: (
          <ProtectedRoute role="admin">
            <EditCurrentJerseys />
          </ProtectedRoute>
        ),
      },
      {
        path: "editUsers",
        element: (
          <ProtectedRoute role="admin">
            <EditUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "editShorts",
        element: (
          <ProtectedRoute role="admin">
            <EditShorts />
          </ProtectedRoute>
        ),
      },
      { path: "logout", action: logoutAction },
      { path: "userDetails", element: <UserDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}

export default App;
