import { prisma } from "@/lib/prisma";

export async function GET() {

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" }
  });

  return Response.json(products);
}


export async function POST(req: Request) {

  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      sku: body.sku,
      category: body.category,
      unit: body.unit,
      stock: Number(body.stock),
      location: body.location
    }
  });

  return Response.json(product);
}


export async function DELETE(req: Request) {

  const body = await req.json();

  const product = await prisma.product.delete({
    where: { id: body.id }
  });

  return Response.json(product);
}


export async function PUT(req: Request) {

  const body = await req.json();

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      stock: Number(body.stock)
    }
  });

  return Response.json(product);
}