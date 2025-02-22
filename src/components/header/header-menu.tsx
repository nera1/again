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

import { Github, Menu, GitCompareArrows, Palette, Ghost } from "lucide-react";

import { Toggle } from "./header";

import styles from "../../styles/header-menu.module.scss";

interface HeaderMenu {
  toggle?: Toggle;
}

const HeaderMenu: FunctionComponent<HeaderMenu> = ({ toggle }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="icon"
          className="bg-transparent"
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${styles["header-menu"]} rounded-md border `}>
        <Command className="!bg-gray">
          <CommandList>
            <CommandGroup
              className="bg-transparent"
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
              <a href="https://github.com/nera1/again" target="_blank">
                <CommandItem className="cursor-pointer">
                  <GitCompareArrows />
                  <span>{`Repository`}</span>
                </CommandItem>
              </a>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => {
                  if (toggle?.handler) {
                    toggle.handler();
                  }
                }}
              >
                {toggle?.value ? <Palette /> : <Ghost />}
                <span>{toggle?.value ? "Colorful" : "Ghost"}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderMenu;
