import { prisma } from "@/lib/prisma";

export async function GET(){

  const logs = await prisma.stockLog.findMany({
  orderBy:{ createdAt:"desc" },
  take:5
});

  return Response.json(logs);

}