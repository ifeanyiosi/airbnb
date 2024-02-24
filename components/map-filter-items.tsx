"use client";

import { categoryItems } from "@/lib/categoryItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export default function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-10 mt-5 items-center justify-center w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          className={cn(
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center"
          )}
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
        >
          <div className="relative w-6 h-6">
            <Image
              width={24}
              height={24}
              src={item.imageUrl}
              alt="Category Image"
              className="w-6 h-6"
            />
          </div>

          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
