import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
	const [session, loading] = useSession();
	const router = useRouter();

	// If no session exists, redirect to login
	useEffect(() => {
		if (!loading && !session) {
			router.push("/");
		}
	}, [session, loading, router]);

	if (loading) return null;

	return <div>Welcome to the dashboard! You are logged in.</div>;
}
