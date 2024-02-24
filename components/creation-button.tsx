import React from "react";
import CreationSubmit from "./submit-button";
import { Button } from "./ui/button";
import Link from "next/link";


export default function CreationButton() {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button asChild variant="secondary" size="lg">
          <Link href="/">Cancel</Link>
        </Button>
        <CreationSubmit />
      </div>
    </div>
  );
}
