import Link from "next/link";
import { useContext } from "react";
import themeContext from "../contexts/themeContext";
import Hightlight from "./Highlight";

function Navbar() {
  const { toggleTheme, theme } = useContext(themeContext);
  const newTheme = theme === "dark" ? "light" : "dark";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
      }}
    >
      <div>
        <span>TEST</span>MY WEBSITE
      </div>
      <div>
        <Link href="/">HOME</Link> |<Link href="/about">ABOUT</Link> |
        <button type="button" onClick={toggleTheme}>
          Set {newTheme} theme
        </button>
      </div>
      <button className="button">
        <Hightlight text={"sample"} />
      </button>
      <style jsx>{`
        .button {
          padding: 1rem;
          border-raduis: 1rem;
          border: none;
          background: green;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Navbar;
