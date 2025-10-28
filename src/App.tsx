import { Outlet } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { Provider } from "./provider";

function App() {
  return (
    <Provider>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </Provider>
  );
}

export default App;
