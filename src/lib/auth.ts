import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('hireloop');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false, 
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "seeker",
                input: true,
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});