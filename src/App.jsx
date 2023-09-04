import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </main>
  );
}

export default App;
