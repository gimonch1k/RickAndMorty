import Header from "../header/Header";
import { MainPage, Page404 } from "../pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <Router>
      <main>
        <div className="app">
          <Header />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
