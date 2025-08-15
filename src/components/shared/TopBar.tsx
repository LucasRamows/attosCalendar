import {Link} from "react-router-dom";
import { PopAccount } from "./PopAccount";
const TopBar = () => {
  return (
    <section className="w-full">
      <div className="flex justify-between w-full">
        <Link to="/home">
          <img src="./assets/logo.svg" alt="Logo" />
        </Link>
        <PopAccount></PopAccount>
      </div>
    </section>
  );
};

export default TopBar;
