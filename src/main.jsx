import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from "./shared/socket/SocketContext";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileProvider } from './Context/ProfileContext.jsx';
import "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ToastContainer />
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </SocketProvider>
    </Provider>
  </StrictMode>
);
