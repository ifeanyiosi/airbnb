"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountries } from "@/lib/getCountries";
import HomeMap from "./home-map";
import { Button } from "./ui/button";
import CreationSubmit from "./submit-button";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "./counter";

export default function SearchModalComponent() {
  const [step, setStep] = useState(1);
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button type="button" onClick={() => setStep(step + 1)}>
          Next
        </Button>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full shadow-md px-5 py-2 border flex items-center cursor-pointer">
          <div className="flex flex-col md:flex-row h-full lg:divide-x text-[0.75rem] font-medium">
            <p className="px-4">Anywhere</p>
            <div className="flex lg:divide-x whitespace-nowrap ">
              <p className="px-4">Any week</p>
              <p className="px-4">Add Guests</p>
            </div>
          </div>

          <Search className="bg-primary text-white p-1 w-8 h-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col" action="">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
                <DialogDescription>Please choose a country</DialogDescription>
              </DialogHeader>

              <Select
                onValueChange={(value) => setLocationValue(value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.flag} {item.label}/{item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              {" "}
              <DialogHeader>
                <DialogTitle>Select the info you need</DialogTitle>
                <DialogDescription>Please choose a country</DialogDescription>
              </DialogHeader>
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
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
