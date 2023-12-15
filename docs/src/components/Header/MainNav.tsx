import React from "react";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
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
        <span className="hidden font-bold sm:inline-block">
          Create Expo Stack
        </span>
      </a>
    </div>
  );
}
