import {UUID} from "@/components/temp-constants";
import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const params = searchParams.get("dynamic");


    try {
        const {rows} =
            await sql`SELECT *
                      FROM prizes
                      WHERE user_uuid = ${UUID}`.then((res) => {
                return res;
            });
        return NextResponse.json({rows}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

//from the database
// INSERT INTO prizes (uuid, point_value, description, User_Uuid)
//   VALUES ('a85baa0e-3f7c-4570-8d03-73a0c06a5c9f', 50, 'UI Prize', 'cb106f38-46c3-11ee-be56-0242ac120002');
