import { useParams } from "react-router-dom";

import Bunner from "../bunner/Bunner";
import Character from "../character/Character";

function SingleCharacterPage() {
  const searchCharId = +useParams().id;

  return (
    <>
      <Bunner />
      <Character charId={searchCharId} />
    </>
  );
}

export default SingleCharacterPage;
