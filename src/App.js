import { Routes, Route } from "react-router-dom";
import './App.css';
import DashList from "./components/DashList.componet";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/" element={<DashList/>} />
      </Routes>
    </div>
  );
}

export default App;
