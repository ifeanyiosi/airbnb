"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" type="submit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button size="lg" type="submit">
          Next
        </Button>
      )}
    </>
  );
}
