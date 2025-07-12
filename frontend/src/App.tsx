import { Suspense } from "react";
import AppRoutes from "./routes";
import Loader from "./components/Loader";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    color: #2d3748;
  }
  * {
    box-sizing: border-box;
  }
`;

const theme = {
  primary: "#4f8cff",
  secondary: "#e75480",
  accent: "#1a237e",
  background: "#f5f7fa",
  card: "#fff",
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}
