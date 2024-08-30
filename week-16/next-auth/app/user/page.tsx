import Appbar from "@/components/Appbar";
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth";

const User = async ()=>{
    const session = await getServerSession(NEXT_AUTH);
    return (
        <div>
            <Appbar />
            {JSON.stringify(session)}
        </div>
    )
}

export default User;