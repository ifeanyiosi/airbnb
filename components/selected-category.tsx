"use client";

import { categoryItems } from "@/lib/categoryItems";
import React, { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import Image from "next/image";

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  return (
    <div className="w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 mx-auto mb-36">
      <input value={selectedCategory as string} name="categoryName" type="hidden" />

      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            onClick={() => setSelectedCategory(item.name)}
            className={`border-[#ddd] rounded-[5px] ${
              selectedCategory === item.name ? "border-primary" : ""
            } `}
          >
            <CardHeader>
              <Image
                className="w-8 h-8"
                height={32}
                width={32}
                src={item.imageUrl}
                alt={item.name}
              />

              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
