"use client";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import GithubStarButton from "./page/GithubStarButton";
import Logo from "./Logo";

const Nav = () => {
  return (
    <nav className="z-[1] flex p-[0.5%] xl:p-[1%] 2xl:p-[1.5%] text-white justify-between items-center w-full">
      {/* <Logo /> */}
      <div className="w-14 h-14"></div>
      <GithubStarButton />
      <Link
        target="_blank"
        href="https://github.com/danstepanov/create-expo-stack"
      >
        <AiFillGithub className="m-2 h-10 w-10" />
      </Link>
    </nav>
  );
};

export default Nav;
