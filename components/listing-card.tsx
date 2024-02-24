import { useCountries } from "@/lib/getCountries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

export default function ListingCard({
  imagePath,
  description,
  location,
  price,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          className="rounded-lg h-full object-cover "
          src={`https://rieqgskdmpgpzjefrevq.supabase.co/storage/v1/object/public/images/${imagePath}`}
          fill
          alt="home image"
        />
      </div>

      <Link className="mt-2" href={""}>
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
