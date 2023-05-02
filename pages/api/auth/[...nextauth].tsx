import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";

const options = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Username",
					type: "text",
					placeholder: "type username",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "type password",
				},
			},
			async authorize(credentials, req) {
				try {
					const response = await axios.post(
						"http://localhost:9090/auth/login",
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);
					if (response.status === 200) {
						const token = response.data.token;
						const decodedToken = jwt.verify(
							token,
							process.env.JWT_SECRET_KEY || ""
						) as JwtPayload & {
							id: string;
							role: string;
							email: string;
						};
						return {
							id: decodedToken.id,
							role: decodedToken.role,
							email: decodedToken.email,
						};
					} else {
						return null;
					}
				} catch (error) {
					console.error("Error in authorize function ", error);
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, user, token }: any) {
			session.user.id = token.id;
			session.user.role = token.role;
			return session;
		},
		async jwt({ token, user }: any) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
	},
};

export default NextAuth(options);
