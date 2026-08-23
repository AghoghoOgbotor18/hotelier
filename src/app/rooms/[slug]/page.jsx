"use client"

import { useParams } from "next/navigation";

export default function RoomDetails(){
    const {slug} = useParams();

    return(
        <div>
            <h1>no content available for now</h1>
        </div>
    )
}