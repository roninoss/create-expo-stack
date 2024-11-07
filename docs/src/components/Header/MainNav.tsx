import React from "react";
import { CREATE_EXPO_STACK_URL } from "@/consts";
export default function MainNav() {
  return (
    <div className="mr-4  flex">
      <a
        href={CREATE_EXPO_STACK_URL}
        className="mr-6 flex items-center space-x-2"
      >
        <span className="  font-bold  inline-block">Create Expo Stack</span>
      </a>
    </div>
  );
}
