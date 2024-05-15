import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { SIDEBAR } from "../../../config";
import { DOCS_URL } from "../../../config";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const createExpoStackArray = SIDEBAR.en?.["Getting Started"];

  return (
    <>
      <button
        id="burger"
        onClick={() => setOpen(!open)}
        className={`z-50 flex items-center ${
          open ? "fixed" : "absolute"
        } justify-center sm:hidden right-3 top-2.5 p-2`}
      >
        <div className="h-6 w-6 relative">
          <X
            className={`duration-300 ${
              open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
            }`}
            size={24}
          />
          <Menu
            className={`duration-300 absolute top-0 ${
              open ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
            }`}
            size={24}
          />
        </div>
        <span className="sr-only">Toggle Menu</span>
      </button>
      <aside
        className={`w-full h-[100lvh] bg-black/50 backdrop-blur-sm ${
          !open && "opacity-0 pointer-events-none"
        } fixed top-0 left-0 z-40 duration-500`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`border-l border-neutral-800 bg-black w-3/4 sm:max-w-sm ${
            open ? "translate-x-0" : "translate-x-full"
          } transform ml-auto h-full flex flex-col text-white p-12 duration-500 ease-in-out`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col space-y-3">
            {createExpoStackArray?.map((item, key) => (
              <a key={key} href={`${DOCS_URL}/${item.link}`}>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
