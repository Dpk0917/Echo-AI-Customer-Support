import { NextRequest,NextResponse } from "next/server";
import Settings from "../../../../../model/setting.model";
import connectDb from "@/lib/db";

export async function POST(req:NextRequest){
    try{
        const{ownerId,businessName,supportEmail,knowledge}=await req.json();
        if(!ownerId){
            return NextResponse.json(
                {message:"OwnerId is required"},
                {status:400}
            )
        }
        await connectDb()
        const settings=await Settings.findOneAndUpdate(
            {ownerId},
            {$set:{ownerId,businessName,supportEmail,knowledge}},
        {new:true,upsert:true}
        )

        return NextResponse.json(settings)

    }catch(error){
        return NextResponse.json(
                {message:`setting error ${error}`},
                {status:500}
            )
    }
}

