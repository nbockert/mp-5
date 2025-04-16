"use server"
import {redirect} from "next/navigation";
import clientPromise from "@/app/lib/mongodb";


export default async function Page({params,}:{params:Promise<{alias:string}> }){
    const{alias} = await params;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('urls');
    const entry = await collection.findOne({alias});
    if(entry){
        redirect(entry.url);
    }else{
        return <p>Alias not found.</p>
    }





}