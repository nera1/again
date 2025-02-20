import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";

import { ChevronRight, Menu } from "lucide-react";

import LogoSymbol from "./icons/logo-symbol";

import styles from "../styles/header.module.scss";

const Header: FunctionComponent = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        <div className={styles["left"]}>
          <Button className="invisible" variant="outline" size="icon">
            <ChevronRight />
          </Button>
        </div>
        <div className={styles["center"]}>
          <LogoSymbol />
        </div>
        <div className={styles["right"]}>
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
