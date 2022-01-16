import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "../../../utils/database/students";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'account',
            credentials: {
                username: {label: 'Email', type:'text', placeholder:'johndoe@test.com', value: null},
                password: {label: 'Password', type:'password', placeholder:'Password', autocomplete: 'false'}
            },
            authorize: async (credentials) => {
                
                return authenticate(credentials.username, credentials.password);
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user) {
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if(token) {
                session.id = token.id;
            }

            return session;
        }
    },
    secret: 'test',
    jwt: {
        secret: 'test',
        encrypion: true,
    }
});