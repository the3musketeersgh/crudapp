import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, {params}){
    const {id}= params;
    const post = await prisma.post.findUnique({where: {id: Number(id)}});
    return NextResponse.json(post);
}

export async function PUT(request, {params}){
    const {id} = params;
    const {title, content} = await request.json();
    const post = await prisma.post.update({
        where: {id: Number(id)},
        data: {title, content},
    });
    return NextResponse.json(post);
}

export async function DELETE(request, {params}){
    const {id} = params;
    await prisma.post.delete({where: {id: Number(id)}});
    return NextResponse.json(null, {status: 204});

}