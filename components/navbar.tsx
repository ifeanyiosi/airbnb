import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserNav from "./user-nav";

export default function Navbar() {
  return (
    <nav className="w-full bg-white top-0 sticky border-b border-[#DDDDDD]">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            width={128}
            height={30}
            src="/airbnb-desktop.png"
            alt="desktop logo"
            className="w-32 hidden lg:block"
          />

          <Image
            width={128}
            height={30}
            src="/airbnb-mobile.webp"
            alt="desktop logo"
            className="w-12 lg:hidden block"
          />
        </Link>

        <div className="rounded-full border-[#ddd] border px-5 py-2 ">
          <h1>This is a search</h1>
        </div>

        <UserNav />
      </div>
    </nav>
  );
}
