import { useAuth } from "../context/auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRequireAuth = () => {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user && !loading) {
			router.push("/login");
		}
	}, [user, loading, router]);

	return user !== null;
};
