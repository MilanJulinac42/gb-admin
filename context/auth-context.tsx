import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface IAuthContext {
	isAuthenticated: boolean;
	user: any;
	setUser: (user: any) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
	isAuthenticated: false,
	user: null,
	setUser: () => {},
	logout: () => {},
	loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const isAuthenticated = !!user;
	console.log(isAuthenticated);

	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const logout = () => {
		setUser(null);
		sessionStorage.removeItem("user");
	};

	const value = {
		isAuthenticated,
		user,
		setUser,
		logout,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
