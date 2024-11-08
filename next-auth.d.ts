import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        role?: string; // or a specific role type if you have one
    }

    interface Session extends DefaultSession {
        user: User;
    }
}
