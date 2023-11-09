import "./App.css";
import Card from "./components/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <div className="container max-w-[1440px] mx-auto px-5">
        <ToastContainer />

        <Card />
      </div>
    </div>
  );
}

export default App;
