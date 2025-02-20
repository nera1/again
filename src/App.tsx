import { useEffect } from "react";

import getData from "./util/getData";
import Header from "./components/header";

import { ThemeProvider } from "./components/theme-provider/theme-provider";

import styles from "./App.module.scss";

function App() {
  useEffect(() => {
    getData();
  });

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className={styles["container"]}>
        <h2 className="text-3xl font-bold tracking-tight">Today's</h2>
        <p className="text-sm mt-2 text-muted-foreground">{formattedDate}</p>
        <h2 className="text-3xl font-bold tracking-tight">Missed</h2>
        <p className="text-sm mt-2 text-muted-foreground">
          Skipped or unsolved problems
        </p>
        <h2 className="text-3xl font-bold tracking-tight">Next up</h2>
        <p className="text-sm mt-2 text-muted-foreground">
          Problems coming soon
        </p>
        <h2 className="text-3xl font-bold tracking-tight">Solved</h2>
        <p className="text-sm mt-2 text-muted-foreground">
          Already solved problems
        </p>
      </div>
    </ThemeProvider>
  );
}

export default App;
