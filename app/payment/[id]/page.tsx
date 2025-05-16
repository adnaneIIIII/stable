"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSingleProduct } from "@/services";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { gql, useMutation } from "@apollo/client";
import { useFormState } from "react-dom";
import { createorder } from "@/app/action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Purchase } from "@/lib/ZodSchema";

// Replace this with your actual GraphQL endpoint schema for enums

export default function ProductPage({ params }: { params: { id: string } }) {
  type Product = {
    compareAtPrice: number;
    description: string;
    id: string;
    isFeatured: boolean;
    name: string;
    price: number;
    publishedAt: string;
    shortdescription: string;
    status: string;
    image: { url: string }[];
  };

  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = (await getSingleProduct(params.id)) as Product[];
    setProduct(res);
    console.log(res);
  };

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
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 py-4 sticky top-0 bg-gray-950 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            holoshop
          </Link>
          {/* Checkout Steps */}
          <div className="hidden md:flex items-center gap-6"></div>
        </div>
      </header>
      <div className="p-4">
        <div className="lg:flex gap-4 justify-center">
          <div className="lg:w-[60%]">
            <form id={from.id} onSubmit={from.onSubmit} action={action}>
              <input
                type="hidden"
                name={fields.product.name}
                defaultValue={params.id}
                key={params.id}
                value={params.id}
              />
              <input
                type="hidden"
                name={fields.productname.name}
                defaultValue={product[0]?.name}
                key={product[0]?.name}
                value={product[0]?.name}
              />
              <input
                type="hidden"
                name={fields.price.name}
                defaultValue={product[0]?.price}
                key={product[0]?.price}
                value={product[0]?.price}
              />
              
              <Card className="mt-5 mb-4">
                <CardHeader>
                  <CardTitle>Checkout Details</CardTitle>
                  <CardDescription>Enter your details</CardDescription>
                </CardHeader>
              </Card>
              <Card className="mt-5 mb-4">
                <CardContent className="pt-4">
                  <div className="flex flex-col gap-6">
                    <div className=" md:flex md:items-center gap-6 ">
                      <div className=" md:w-[50%] ">
                        <Label>FirstName</Label>
                        <Input
                          type="text"
                          placeholder="firstName"
                          className="w-full m-2"
                          key={fields.firstname.key}
                          name={fields.firstname.name}
                          defaultValue={fields.firstname.initialValue}
                        />
                      </div>
                      <div className=" md:w-[50%] gap-3 ">
                        <Label>LastName</Label>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          className="w-full m-2"
                          key={fields.lastname.key}
                          name={fields.lastname.name}
                          defaultValue={fields.lastname.initialValue}
                        />
                      </div>
                    </div>
                    <div className="md:flex flex-col md:flex-col gap-3">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        className="w-full"
                        placeholder="EmailAddress"
                        key={fields.email.key}
                        name={fields.email.name}
                        defaultValue={fields.email.initialValue}
                      />
                    </div>
                    <div className="md:flex flex-col md:flex-col gap-3">
                      <Label>phone</Label>
                      <Input
                        type="phone"
                        className="w-full"
                        placeholder="phone"
                        key={fields.phone.key}
                        name={fields.phone.name}
                        defaultValue={fields.phone.initialValue}
                      />
                    </div>
                    <Label>country</Label>
                    <Select
                      key={fields.country.key}
                      name={fields.country.name}
                      defaultValue={fields.country.initialValue}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United_States">
                          United States
                        </SelectItem>
                        <SelectItem value="United_Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="mt-4 bg-slate-100">
                      Continue to Shipping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
          <div className="mt-5 lg:w-[25%]">
            <Card className="mb-2">
              <CardContent className="pt-4">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {/* Product preview */}
                  <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-800">
                      <Image
                        src={product[0]?.image[0]?.url}
                        alt={product[0]?.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-white">
                        {product[0]?.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Modern Design
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${product[0]?.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-medium text-white">
                        ${product[0]?.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Compare Price</span>
                      <span className="font-medium text-red-400 line-through">
                        ${product[0]?.compareAtPrice}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-800 pt-2 mt-2">
                      <span className="font-medium text-white">Total</span>
                      <span className="font-bold text-white">
                        ${product[0]?.price}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex justify-start gap-3 mt-4">
                      <Button>
                        <Link href={"/admin/products"}>Buy Now</Link>
                      </Button>
                    </div> */}

                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Lock className="h-4 w-4" />
                    <span>Secure Checkout - SSL Encrypted</span>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Ensuring your financial and personal details are secure
                    during every transaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
