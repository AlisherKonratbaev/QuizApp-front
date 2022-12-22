import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Subjects from "./pages/Subjects";
import Questions from "./pages/Questions";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 6); // 10 minutes timer
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home expiryTimestamp={time} />}></Route>
          <Route path="subjects" element={<Subjects />} />
          <Route path="questions" element={<Questions />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
