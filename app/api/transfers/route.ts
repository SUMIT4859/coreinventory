import { prisma } from "@/lib/prisma";

export async function POST(req: Request){

  const body = await req.json();

  const productId = Number(body.productId);
  const quantity = Number(body.quantity);
  const fromLocation = body.fromLocation;
  const toLocation = body.toLocation;

  const product = await prisma.product.findUnique({
    where:{ id: productId }
  });

  await prisma.stockLog.create({
    data:{
      product: product?.name || "",
      type: "TRANSFER",
      quantity,
      from: fromLocation,
      to: toLocation
    }
  });

  return Response.json({message:"Transfer recorded"});
}