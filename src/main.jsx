// index.js
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app";
import store from "./store"; // Asegúrate de que la ruta es correcta

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
