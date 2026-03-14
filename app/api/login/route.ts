import { prisma } from "@/lib/prisma";

export async function POST(req: Request){

  const body = await req.json();

  const user = await prisma.user.findUnique({
    where:{ email: body.email }
  });

  if(!user || user.password !== body.password){
    return Response.json(
      {error:"Invalid login"},
      {status:401}
    );
  }

  return Response.json({success:true});

}