import { useParams } from "react-router-dom";

import Bunner from "../bunner/Bunner";
import Episode from "../episode/Episode";

function SingleEpisodePage() {
  const charId = useParams();

  return (
    <>
      <Bunner />
      <Episode charId={charId.id} />
    </>
  );
}

export default SingleEpisodePage;
