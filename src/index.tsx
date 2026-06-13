/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import "./styles/tokens.css";
import App from "./App.tsx";
import { ThemeProvider } from "components";

const root = document.getElementById("root");

render(
  () => (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  ),
  root!,
);
