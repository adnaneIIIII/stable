"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createorder } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Purchase } from "../../lib/ZodSchema";
import { useFormState } from "react-dom";

export type ContactFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  emailAddress: string;
  country: string;
};

export default function ContactPage() {
  const [lastResult, action] = useFormState(createorder, undefined);
  const [from, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: Purchase });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="container mx-auto py-8">
      <form id={from.id} onSubmit={from.onSubmit} action={action}>
        <Card className="mt-5 mb-4">
          <CardHeader>
            <CardTitle>Checkout Details</CardTitle>
            <CardDescription>Enter your details</CardDescription>
          </CardHeader>
        </Card>
        <Card className="mt-5 mb-4">
          <CardContent className="pt-4">
            <div className="flex flex-col gap-6">
              <div className="md:flex md:items-center gap-6">
                <div className="md:w-[50%]">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    id="firstname"
                    placeholder="First Name"
                    key={fields.firstname.key}
                    name={fields.firstname.name}
                    defaultValue={fields.firstname.initialValue}
                  />
                </div>
                <div className="md:w-[50%]">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    key={fields.lastname.key}
                    name={fields.lastname.name}
                    defaultValue={fields.lastname.initialValue}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emailAddress">Email</Label>
                <Input
                  type="email"
                  id="emailAddress"
                  placeholder="example@email.com"
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={fields.email.initialValue}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  key={fields.phone.key}
                  name={fields.phone.name}
                  defaultValue={fields.phone.initialValue}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  key={fields.country.key}
                  name={fields.country.name}
                  defaultValue={fields.country.initialValue}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United_States">United States</SelectItem>
                    <SelectItem value="United_Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                size="lg"
                type="submit"
                className="w-full bg-primary mt-4"
              >
                Place Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
