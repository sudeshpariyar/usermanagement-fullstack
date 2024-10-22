import { ToastContainer } from "react-toastify";
import "./App.scss";
import GlobalRouter from "./routes";

function App() {
  return (
    <>
      <GlobalRouter />
      <ToastContainer />
    </>
  );
}
export default App;
