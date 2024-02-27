import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItems from "@/components/no-items";
import ListingCard from "@/components/listing-card";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore()
  const data = await prisma.favorites.findMany({
    where: {
      userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorites: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}

export default async function Favorites() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10 ">
      <h2 className="text-3xl font-semibold tracking-tight">Your favorites</h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey! No favorites yet!"
          description="Please add to favorites to see them right here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              pathname="/favorites"
              favId={item.Home?.Favorites[0].id as string}
              isFav={
                (item.Home?.Favorites?.length as number) > 0 ? true : false
              }
              userId={user?.id}
              location={item.Home?.country as string}
              description={item.Home?.description as string}
              imagePath={item.Home?.photo as string}
              key={item.Home?.id}
              price={item.Home?.price as number}
              homeId={item.Home?.id as string}
            />
          ))}
        </div>
      )}
    </section>
  );
}
