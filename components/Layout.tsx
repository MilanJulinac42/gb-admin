import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

export default function Layout({ children }: any) {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className="bg-blue-900 min-h-screen flex">
				<Nav />
				<div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
					{children}
				</div>
			</div>
		);
	}

	return (
		<div>
			<form
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					const target = e.target as typeof e.target & {
						email: { value: string };
						password: { value: string };
					};
					const email = target.email.value;
					const password = target.password.value;
					signIn("credentials", {
						email: email,
						password: password,
					});
				}}
			>
				<input type="text" id="email" required />
				<input type="password" id="password" required />
				<button type="submit">Sign in</button>
			</form>
		</div>
	);
}
