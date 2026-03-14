import { prisma } from "@/lib/prisma";

export async function POST(req: Request){

  const body = await req.json();

  const productId = Number(body.productId);
  const quantity = Number(body.quantity);
  const reason = body.reason;

  const product = await prisma.product.update({

    where:{ id: productId },

    data:{
      stock:{
        increment: quantity
      }
    }

  });

  await prisma.stockLog.create({
    data:{
      product: product.name,
      type: "ADJUSTMENT",
      quantity: quantity
    }
  });

  return Response.json(product);

}