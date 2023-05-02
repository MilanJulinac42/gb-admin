import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	if (session) {
		const { email, id, role }: any = session.user;

		return (
			<div>
				<div>Logged in as {email}</div>
				<div>ID: {id}</div>
				<div>Role: {role}</div>
				<button onClick={() => signOut()}>Sign Out</button>
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
