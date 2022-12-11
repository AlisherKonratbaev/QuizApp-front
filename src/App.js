import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Subjects from "./pages/Subjects";
import Questions from "./pages/Questions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="subjects" element={<Subjects />} />
          <Route path="questions" element={<Questions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
