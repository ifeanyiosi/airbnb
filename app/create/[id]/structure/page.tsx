import CreationButton from "@/components/creation-button";
import SelectCategory from "@/components/selected-category";
import CreationSubmit from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { createCategoryPage } from "@/lib/actions";
import Link from "next/link";
import React from "react";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describes your home
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />

        <CreationButton />
      </form>
    </>
  );
}
