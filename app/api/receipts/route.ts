import { prisma } from "@/lib/prisma";

export async function GET(){

  const receipts = await prisma.stockLog.findMany({
    where:{ type:"RECEIPT" },
    orderBy:{ createdAt:"desc" }
  });

  return Response.json(receipts);

}


export async function POST(req: Request){

  const body = await req.json();

  const productId = Number(body.productId);
  const quantity = Number(body.quantity);

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
      type: "RECEIPT",
      quantity: quantity
    }
  });

  return Response.json(product);

}