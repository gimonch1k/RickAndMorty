import GreenCircle from "../indicators/GreenCircle";
import RedCross from "../indicators/RedCross";
import Unknown from "../indicators/Unknown";

function StatusIndicator({ status }) {
  const icons = {
    Alive: <GreenCircle />,
    Dead: <RedCross />,
    unknown: <Unknown />,
  };

  return icons[status];
}

export default StatusIndicator;
