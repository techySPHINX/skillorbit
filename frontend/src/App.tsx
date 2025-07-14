import { Suspense } from "react";
import AppRoutes from "./routes";
import Loader from "./components/Loader";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </Provider>
  );
}
