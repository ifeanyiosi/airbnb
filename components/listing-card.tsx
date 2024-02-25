import { useCountries } from "@/lib/getCountries";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddFavorite, DeleteFromFavoriteButton } from "./submit-button";
import { addToFavorites, deleteFavorites } from "@/lib/actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isFav: boolean;
  favId: string;
  homeId: string;
  pathname: string;
}

export default function ListingCard({
  imagePath,
  description,
  location,
  price,
  userId,
  isFav,
  pathname,
  favId,
  homeId,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <Link href={`/home/${homeId}`} className="relative h-72">
        <Image
          className="rounded-lg h-full object-cover "
          src={`https://rieqgskdmpgpzjefrevq.supabase.co/storage/v1/object/public/images/${imagePath}`}
          fill
          alt="home image"
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isFav ? (
              <form action={deleteFavorites}>
                <input type="hidden" name="favId" value={favId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorites}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddFavorite />
              </form>
            )}
          </div>
        )}
      </Link>

      <Link className="mt-2" href={`/home/${homeId}`}>
        <h3 className="font-medium text-base ">
          {country?.label} {country?.region}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-1">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
