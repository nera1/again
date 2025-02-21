import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronsUpDownIcon } from "lucide-react";

export type CollapsibleContainer = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function CollapsibleContainer({
  title,
  description,
  children,
}: CollapsibleContainer) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={`flex pb-3`}>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm mt-2 text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-end">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronsUpDownIcon />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <Separator />
      <AnimatePresence>
        {open && (
          <CollapsibleContent asChild forceMount>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="py-3">{children}</div>
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible>
  );
}
