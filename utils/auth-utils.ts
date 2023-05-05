import axios from "axios";
import jwt_decode from "jwt-decode";

export async function login(email: string, password: string) {
	try {
		const response = await axios.post(
			"http://localhost:9090/auth/login",
			{
				email,
				password,
			},
			{
				withCredentials: true,
			}
		);

		const { data } = response;
		const { token } = data;
		const user = jwt_decode(token);
		sessionStorage.setItem("user", JSON.stringify(user));
		return user;
	} catch (error) {
		throw new Error("Invalid email or password");
	}
}
