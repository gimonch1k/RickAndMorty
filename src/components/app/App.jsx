import Header from "../header/Header";
import { MainPage } from "../pages";

import "./App.scss";

function App() {
  return (
    <main>
      <div className="app">
        <Header />
        <MainPage />
      </div>
    </main>
  );
}

export default App;
