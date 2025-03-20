import { API } from "./utils";

interface RegisterUserParams {
    username: string;
    password: string;
}

interface LoginParams {
    username: string;
    password: string;
}
const registerUser = async (params: RegisterUserParams) => {
    try {
        const response = await API.post("/auth/register", params);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

const loginUser = async (params: LoginParams) => {
    try {
        const response = await API.post("/auth/login", params);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export { registerUser, loginUser };
