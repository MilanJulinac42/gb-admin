import "@/styles/globals.css";
import { AuthProvider } from "../context/auth-context";
import { AppProps } from "next/app";
import ProtectedRoutes from "../utils/protected-routes";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ProtectedRoutes>
				<Component {...pageProps} />
			</ProtectedRoutes>
		</AuthProvider>
	);
}

export default MyApp;
