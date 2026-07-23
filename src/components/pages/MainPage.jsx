import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchPanel from "../searchPanel/SearchPanel";

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
        <div
          style={{
            position: "sticky",
            display: "flex",
            flexDirection: "column",
            rowGap: "30px",
            top: "50px",
            width: "425px",
          }}
        >
          <CharInfo selectedId={selectedChar} />
          <SearchPanel />
        </div>
      </section>
    </>
  );
}

export default MainPage;
