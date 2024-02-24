"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

export default function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} id="" />
      <Button onClick={decrease} type="button" size="icon" variant="outline">
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{amount}</p>

      <Button onClick={increase} size="icon" type="button" variant="outline">
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
