"use client";

import { FunctionComponent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Github, Menu, GitCompareArrows } from "lucide-react";

import styles from "../../styles/header-menu.module.scss";

const HeaderMenu: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="icon"
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${styles["header-menu"]} rounded-md border`}>
        <Command>
          <CommandList>
            <CommandGroup
              heading="Menu"
              onClick={() => {
                setOpen(false);
              }}
            >
              <a href="https://github.com/nera1" target="_blank">
                <CommandItem className="cursor-pointer">
                  <Github />
                  <span>{"Github"}</span>
                </CommandItem>
              </a>
              <a href="https://github.com/nera1/sumr" target="_blank">
                <CommandItem className="cursor-pointer">
                  <GitCompareArrows />
                  <span>{`Repository`}</span>
                </CommandItem>
              </a>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderMenu;
