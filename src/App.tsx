import { useEffect } from "react";
import "./App.module.scss";
import getData from "./util/getData";

function App() {
  useEffect(() => {
    getData();
  });
  return <>안녕?</>;
}

export default App;
