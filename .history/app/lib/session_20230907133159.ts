import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken"
import { JWT } from "next-auth/jwt";
import { OAuthUserConfig } from "next-auth/providers";

export const authOptions: NextAuthOptions = {
    providers: [
    //write Google providers
    GoogleProvider({
        clientId: "",
        clientSecret: "",
    })

    ]
}