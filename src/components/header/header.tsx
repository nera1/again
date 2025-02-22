import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";

import LogoSymbol from "../icons/logo-symbol";

import HeaderMenu from "./header-menu";

import styles from "../../styles/header.module.scss";

export type Toggle = {
  handler: Function;
  value: boolean;
};

interface Header {
  toggle?: Toggle;
}

const Header: FunctionComponent<Header> = ({ toggle }) => {
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
        <div className={`${styles["right"]} group`}>
          <HeaderMenu toggle={toggle} />
        </div>
      </div>
    </header>
  );
};

export default Header;
