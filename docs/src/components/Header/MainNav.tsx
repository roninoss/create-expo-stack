import React from "react";
import { RN_NEW_URL } from "@/consts";
export default function MainNav() {
  return (
    <div className="mr-4  flex">
      <a href={RN_NEW_URL} className="mr-6 flex items-center space-x-2">
        <span className="  font-bold  inline-block">rn.new</span>
      </a>
    </div>
  );
}
