import { useEffect, useState } from "react";

import getData from "./util/getData";
import Header from "./components/header/header";

import { ThemeProvider } from "./components/theme-provider/theme-provider";

import { ClassifiedProblems, Problem, sortProblemData } from "./util/sortData";

import CollapsibleContainer from "./components/collapsible-container/collapsible-container";
import ProblemItem from "./components/problem/problem";

import styles from "./App.module.scss";

interface AppState extends ClassifiedProblems {
  ghost: boolean;
  onLoad: boolean;
}

function Empty() {
  return (
    <div className="p-6 flex justify-center">
      <small className="text-sm font-medium leading-none text-muted-foreground">
        Empty
      </small>
    </div>
  );
}

function Loading() {
  return (
    <div className="p-6 flex justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-t-transparent rounded-full"></div>
    </div>
  );
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    done: [],
    missed: [],
    today: [],
    nextup: [],
    ghost: false,
    onLoad: false,
  });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${date}`;
    getData().then((data) =>
      setAppState((prev) => ({
        ...prev,
        ...sortProblemData(data as unknown as Problem[][], todayDate),
        onLoad: true,
      }))
    );
  }, []);

  function toggleColorMode() {
    setAppState((prev) => ({ ...prev, ghost: !prev.ghost }));
  }

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header toggle={{ handler: toggleColorMode, value: appState.ghost }} />
      <div className={`${styles["container"]} flex flex-col gap-y-5`}>
        <CollapsibleContainer
          title="Today's"
          description={formattedDate}
          isCollapsed={false}
        >
          <ul className="p-0 m-0 flex flex-col gap-y-3">
            <ul className="p-0 m-0 flex flex-col gap-y-3">
              {appState.onLoad ? (
                appState.today.length ? (
                  appState.today.map((item, index) => (
                    <ProblemItem
                      {...item}
                      key={`t_${index}`}
                      ghost={appState.ghost}
                    />
                  ))
                ) : (
                  <Empty />
                )
              ) : (
                <Loading />
              )}
            </ul>
          </ul>
        </CollapsibleContainer>
        <CollapsibleContainer
          title="Missed"
          description="Skipped or unsolved problems"
        >
          <ul className="p-0 m-0 flex flex-col gap-y-3">
            <ul className="p-0 m-0 flex flex-col gap-y-3">
              {appState.onLoad ? (
                appState.missed.length ? (
                  appState.missed.map((item, index) => (
                    <ProblemItem
                      {...item}
                      key={`m_${index}`}
                      ghost={appState.ghost}
                    />
                  ))
                ) : (
                  <Empty />
                )
              ) : (
                <Loading />
              )}
            </ul>
          </ul>
        </CollapsibleContainer>
        <CollapsibleContainer
          title="Next up"
          description="Problems coming soon"
        >
          <ul className="p-0 m-0 flex flex-col gap-y-3">
            <ul className="p-0 m-0 flex flex-col gap-y-3">
              {appState.onLoad ? (
                appState.nextup.length ? (
                  appState.nextup.map((item, index) => (
                    <ProblemItem
                      {...item}
                      key={`n_${index}`}
                      ghost={appState.ghost}
                    />
                  ))
                ) : (
                  <Empty />
                )
              ) : (
                <Loading />
              )}
            </ul>
          </ul>
        </CollapsibleContainer>
        <CollapsibleContainer
          title="Solved"
          description="Already solved problems"
        >
          <ul className="p-0 m-0 flex flex-col gap-y-3">
            <ul className="p-0 m-0 flex flex-col gap-y-3">
              {appState.onLoad ? (
                appState.done.length ? (
                  appState.done.map((item, index) => (
                    <ProblemItem
                      {...item}
                      key={`d_${index}`}
                      ghost={appState.ghost}
                    />
                  ))
                ) : (
                  <Empty />
                )
              ) : (
                <Loading />
              )}
            </ul>
          </ul>
        </CollapsibleContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
