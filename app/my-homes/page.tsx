import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItems from "@/components/no-items";
import ListingCard from "@/components/listing-card";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },

    select: {
      photo: true,
      id: true,

      price: true,
      country: true,
      description: true,
      Favorites: {
        where: {
          userId,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/login");
  const data = await getData(user.id);

  return (
    <section className="container mx-auto mb-36 px-5 lg:px-10 mt-10 ">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey! You don't have any homes yet"
          description="Please add new homes to see them right here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              pathname="/my-homes"
              favId={item.Favorites[0]?.id as string}
              isFav={(item.Favorites?.length as number) > 0 ? true : false}
              userId={user?.id}
              location={item.country as string}
              description={item.description as string}
              imagePath={item.photo as string}
              key={item.id}
              price={item.price as number}
              homeId={item.id as string}
            />
          ))}
        </div>
      )}
    </section>
  );
}
