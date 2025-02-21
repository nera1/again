import { useEffect, useState } from "react";

import getData from "./util/getData";
import Header from "./components/header/header";

import { ThemeProvider } from "./components/theme-provider/theme-provider";

import { ClassifiedProblems, Problem, sortProblemData } from "./util/sortData";

import styles from "./App.module.scss";
import CollapsibleContainer from "./components/collapsible-container/collapsible-container";

function App() {
  const [appState, setAppState] = useState<ClassifiedProblems>({
    done: [],
    missed: [],
    today: [],
    nextup: [],
  });

  useEffect(() => {
    getData().then((data) =>
      setAppState(sortProblemData(data as unknown as Problem[][]))
    );
  }, []);

  useEffect(() => {
    console.log(appState);
  }, [appState]);

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
      <div className={`${styles["container"]} flex flex-col gap-y-5`}>
        <CollapsibleContainer
          title="Today's"
          description={formattedDate}
        ></CollapsibleContainer>
        <CollapsibleContainer
          title="Missed"
          description="Skipped or unsolved problems"
        ></CollapsibleContainer>
        <CollapsibleContainer
          title="Next up"
          description="Problems coming soon"
        ></CollapsibleContainer>
        <CollapsibleContainer
          title="Solved"
          description="Already solved problems"
        ></CollapsibleContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
