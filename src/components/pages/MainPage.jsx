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
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CharList onSelectedChar={setSelectedChar} />
        <CharInfo selectedId={selectedChar} />
      </section>
    </>
  );
}

export default MainPage;
