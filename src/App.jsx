// 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
import "./App.css";
import Card from "./components/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Card />
    </div>
  );
}

export default App;
