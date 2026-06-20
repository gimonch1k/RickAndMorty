import Header from "../header/Header";
import { MainPage, Page404, EpisodesPage } from "../pages";
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
            <Route path="/episodes" element={<EpisodesPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
