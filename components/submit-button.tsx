"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";

export default function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" type="submit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin bg-primary-foreground " />
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

export function AddFavorite() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="icon" className="bg-primary-foreground">
          <Loader2 className="text-primary h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="icon" className="bg-primary-foreground">
          <Loader2 className="text-primary h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
        >
          <Heart className="w-4 h-4 text-primary " fill="#e21c48" />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className=" h-4 w-4 animate-spin mr-2" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Make a Reservation!
        </Button>
      )}
    </>
  );
}
