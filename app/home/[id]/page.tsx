/* eslint-disable @next/next/no-img-element */
import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useCountries } from "@/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import CategoryShowcase from "@/components/category-showcase";
import HomeMap from "@/components/home-map";
import { SelectCalendar } from "@/components/select-calendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createReservation } from "@/lib/actions";
import { Value } from "@radix-ui/react-select";
import { ReservationSubmitButton } from "@/components/submit-button";

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
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
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
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="lg:w-[75%] px-5 lg:px-0 w-full mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>

      <div className="relative h-[550px]">
        <Image
          className="rounded-lg w-full h-full object-cover "
          fill
          src={`https://rieqgskdmpgpzjefrevq.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of home"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-x-24 mt-8 ">
        <div className="lg:w-2/3 ">
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

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />

          <SelectCalendar reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
