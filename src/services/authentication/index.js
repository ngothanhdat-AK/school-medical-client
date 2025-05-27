import axiosInstance from "../../api/axios";

export const authenticationAPI = {
    Login: async (data) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                phoneNumber: data.phoneNumber,
                password: data.password,
            });
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error; // Re-throw the error for further handling
        }
    },
    ResetPassword: {

    },
}