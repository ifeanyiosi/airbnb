/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "@/lib/actions";

export default async function UserNav() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const createHomeWithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border shadow-md border-[#DDDDDD]  px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ??
              "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png"
            }
            alt="image of user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[200px]  z-10 bg-white border-none "
      >
        {user ? (
          <>
            <DropdownMenuItem className="">
              <form className="w-full" action={createHomeWithId}>
                <button type="submit" className="w-full text-start">
                  Airbnb your Home
                </button>
              </form>
            </DropdownMenuItem>

            <DropdownMenuItem className="">
              <Link className="" href="/my-homes">
                My Listings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/favorites">My Favorites</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/reservations">My Reservations</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-300" />
            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
