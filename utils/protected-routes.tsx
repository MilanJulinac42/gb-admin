import { ReactNode } from "react";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/router";

type ProtectedRoutesProps = {
	children: ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
	const router = useRouter();
	const isLoginPage = router.pathname === "/login";
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!isLoginPage && !user) {
		router.push("/login");
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoutes;
