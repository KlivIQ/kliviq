import { ViteReactSSG } from "vite-react-ssg";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./routes";
import "./index.css";

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient, initialState }) => {
    // setup hook — HelmetProvider is wired below via app wrapping
  },
  {
    rootContainer: "#root",
    transformState(state) {
      return state;
    },
  },
);
