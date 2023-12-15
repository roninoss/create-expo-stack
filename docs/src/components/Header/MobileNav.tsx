import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { SIDEBAR } from "@/consts";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const createExpoStackArray = SIDEBAR.en?.["Create Expo Stack"];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <div>
            <img
              className="block dark:hidden"
              width="28"
              height="28"
              src="/logo-light.svg"
              alt="Create Expo Stack Logo Dark"
            />
            <img
              className="hidden dark:block"
              width="28"
              height="28"
              src="/logo-dark.svg"
              alt="Create Expo Stack Logo Light"
            />
          </div>
          <span className="font-bold  inline-block">Create Expo Stack</span>
        </a>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-10">
          <div className="flex flex-col space-y-3">
            {createExpoStackArray?.map((item, idx) => {
              return (
                <div key={idx}>
                  <MobileLink
                    href={`/${item.link}`}
                    onClick={() => console.log("Link clicked")}
                    onOpenChange={setOpen}
                    className="flex items-start"
                  >
                    {item.text}
                  </MobileLink>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  href: string; // Include href in the interface
  onClick: () => void;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onClick,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const handleClick = () => {
    onClick();
    onOpenChange?.(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      {...props}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
