import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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

      country: true,
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(params.id);

  return <div>HomeRoute</div>;
}
