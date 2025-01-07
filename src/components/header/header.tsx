import "./header.css";
import CurrentDate from "../Utils/date";

function Header() {
  return (
    <div className="header">
      <div className="date">
        <CurrentDate />
      </div>
      <h2>Cash Envelope</h2>
    </div>
  );
}

export default Header;
