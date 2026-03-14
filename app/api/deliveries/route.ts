import { prisma } from "@/lib/prisma";

export async function GET(){

  const deliveries = await prisma.stockLog.findMany({
    where:{ type:"DELIVERY" },
    orderBy:{ createdAt:"desc" }
  });

  return Response.json(deliveries);

}


export async function POST(req: Request){

  const body = await req.json();

  const productId = Number(body.productId);
  const quantity = Number(body.quantity);

  const product = await prisma.product.update({

    where:{ id: productId },

    data:{
      stock:{
        decrement: quantity
      }
    }

  });

  await prisma.stockLog.create({
    data:{
      product: product.name,
      type: "DELIVERY",
      quantity: quantity
    }
  });

  return Response.json(product);

}