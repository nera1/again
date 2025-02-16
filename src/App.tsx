import { useEffect } from "react";
import styles from "./App.module.scss";
import getData from "./util/getData";
import Header from "./components/header";

function App() {
  useEffect(() => {
    getData();
  });
  return (
    <>
      <Header />
      <div className={styles["container"]}></div>
    </>
  );
}

export default App;
