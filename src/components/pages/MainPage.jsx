import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

function MainPage() {
  const [selectedChar, setSelectedChar] = useState(null);

  return (
    <>
      <RandomChar />
      <section
        style={{
          position: "relative",
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CharList
          onSelectedChar={setSelectedChar}
          selectedChar={selectedChar}
        />
        <div style={{ position: "sticky", top: "50px", width: "425px" }}>
          <CharInfo selectedId={selectedChar} />
        </div>
      </section>
    </>
  );
}

export default MainPage;
