import { useAuth } from "../context/auth-context";
import { login } from "../utils/auth-utils";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
	const { setUser } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const user = await login(email, password);
			setUser(user);
			sessionStorage.setItem("user", JSON.stringify(user));
			router.push("/baskets");
		} catch (error: any) {
			console.error("Error logging in:", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				required
				id="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<input
				type="password"
				required
				id="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button type="submit">Login</button>
		</form>
	);
}
