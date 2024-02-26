/* eslint-disable @next/next/no-img-element */
import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useCountries } from "@/lib/getCountries";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },

    select: {
      photo: true,
      description: true,
      guests: true,
      bedrroms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      createdAt: true,

      country: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  return (
    <div className="w-[75%] mx-auto mt-10">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>

      <div className="relative h-[550px]">
        <Image
          className="rounded-lg w-full h-full object-cover "
          fill
          src={`https://rieqgskdmpgpzjefrevq.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of home"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8 ">
        <div className="w-2/3 ">
          <h3 className="text-xl font-medium">{country?.label}</h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>
              {data?.guests} Guests * {data?.bedrroms} Bedrooms *{" "}
              {data?.bathrooms} Bathrooms{" "}
            </p>
          </div>

          <div className="flex items-center mt-6 ">
            <img
              src={
                data?.User?.profileImage ??
                "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png"
              }
              alt="User Image"
              className="w-11 h-11 rounded-full"
            />

            <div className="flex flex-col ml-4">
              <h3 className="font-medium">{data?.User?.firstName}</h3>

              <p className="text-sm text-muted-foreground">
                Hosted since {data?.createdAt.toString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
