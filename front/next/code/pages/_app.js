import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import ThemeContext from "../contexts/themeContext";

const themes = {
  dark: {
    background: "black",
    color: "white",
  },
  light: {
    background: "white",
    color: "black",
  },
};

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            ...themes[theme],
          }}
        >
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

// getInitialProps sample
// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const additionalProps = await fetch();
//   return {
//     ...appProps,
//     ...additionalProps,
//   };
// };

export default MyApp;
