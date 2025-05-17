"use server";
import { parseWithZod } from "@conform-to/zod";
import { prisma } from "../lib/db";
import { Purchase } from "../lib/ZodSchema";
import { redirect } from "next/navigation";


export async function createorder(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: Purchase,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    await prisma.purchase.create({
      data: {
        firstname: submission.value.firstname,
        lastname: submission.value.lastname,
        email: submission.value.email,
        phone: submission.value.phone,
        product: submission.value.product,
        price: submission.value.price,
        productname: submission.value.productname,
        country: submission.value.country,
      },
    });
    console.log("success");
  } catch (error) {
    console.log("error", error);
  }
  redirect(`/payment/${submission.value.product}`); // Redirect to the product page
}
