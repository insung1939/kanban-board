import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/global-style";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>
);
