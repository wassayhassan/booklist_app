import { Routes, Route } from "react-router-dom";
import './App.css';
import DashList from "./components/DashList.componet";
import Login from "./components/Login";
import AddNew from "./components/AddNew";
import ItemEdit from "./components/ItemEdit";

function App() {
  return (
    <div className="App md:overflow-x-hidden lg:overflow-x-hidden 2xl:overflow-x-hidden">
      <Routes>
        <Route exact path="/add" element={<AddNew />} />
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/" element={<DashList/>} />
        <Route exact path="/company/:id" element={<ItemEdit />} />
      </Routes>
    </div>
  );
}

export default App;
