import Counter from "@/components/counter";
import CreationButton from "@/components/creation-button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createDescription } from "@/lib/actions";
import React from "react";

export default function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can
        </h2>
      </div>

      <form action={createDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto px-5 lg:px-0 lg:w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              required
              name="title"
              placeholder="e.g., My cozy room in the heart of Tokyo"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              required
              placeholder="Price per night in USD"
              min={10}
            />
          </div>

          <div className="flex flex-col gap-y-2 ">
            <Label>Image</Label>
            <Input name="image" type="file" />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests?
                  </p>
                </div>

                <Counter name="guest" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms are available?
                  </p>
                </div>

                <Counter name="room" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>

                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <CreationButton />
      </form>
    </>
  );
}
