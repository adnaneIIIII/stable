"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSingleProduct } from "@/services";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

// Replace this with your actual GraphQL endpoint schema for enums

declare global {
  interface Window {
    paypal: any;
  }
}

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

  useEffect(() => {
    const container = document.getElementById("paypal-button-container");

    if (
      typeof window !== "undefined" &&
      window.paypal &&
      product.length > 0 &&
      product[0].price !== undefined &&
      container &&
      container.children.length === 0
    ) {
      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: String(product[0].price), // <- ONLY product[0].price
                  },
                },
              ],
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );
            });
          },
          onError: (err: any) => {
            console.error("PayPal Checkout onError", err);
          },
        })
        .render("#paypal-button-container");
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [product]);

  return (
    <>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=AX3MMECid_3bILgGEAFbhz7s151gGaCQ4VtPy47ZbEXcSVXgR6DwHVpO1RDxF5tJG0eBQrxy5nXglSeX&enable-funding=venmo&currency=USD"
        strategy="beforeInteractive"
      />
      <div className="min-h-screen  ">
        {/* Header */}
        <header className="border-b border-gray-800 py-4 sticky top-0  z-10">
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
              <Card className="mt-5 mb-4">
                <CardHeader>
                  <CardTitle>Checkout Details</CardTitle>
                  <CardDescription>Enter your details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="smart-button-container">
                    <div>
                      <div id="paypal-button-container"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-5 lg:w-[25%]">
              <Card className="mb-2">
                <CardContent className="pt-4">
                  <h2 className="mb-4 text-xl font-semibold ">Order Summary</h2>

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
                        <h3 className="text-sm font-medium ">
                          {product[0]?.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                          Modern Design
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium ">
                          ${product[0]?.price}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="font-medium ">
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
                        <span className="font-medium ">Total</span>
                        <span className="font-bold ">${product[0]?.price}</span>
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
    </>
  );
}
