"use client";

import CreationButton from "@/components/creation-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { createLocation } from "@/lib/actions";
import { useCountries } from "@/lib/getCountries";
import dynamic from "next/dynamic";
import React, { useState } from "react";

export default function AddressRoute({ params }: { params: { id: string } }) {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");
  const LazyMap = dynamic(() => import("@/components/map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return (
    <>
      <div className="lg:w-3/5 px-5 lg:px-0 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10 ">
          Where is your home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="lg:w-3/5 mb-36 px-5 lg:px-0  mx-auto ">
          <div className="mb-5">
            <Select onValueChange={(value) => setLocationValue(value)} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country..." />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.flag} {item.label}/{item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap locationValue={locationValue} />
        </div>

        <CreationButton />
      </form>
    </>
  );
}
