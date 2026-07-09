export const AuthService = {

    // login: (accessToken: string, refreshToken: string) => {
    //     sessionStorage.setItem("accessToken", accessToken);
    //     sessionStorage.setItem("refreshToken", refreshToken);
    // },

    IsAuthenticated: async () => {
        try {
            const response = await fetch("http://localhost:5277/me", {
                method: "GET",
                credentials: "include", 
            });
            
            if(response.ok)
            {
                console.log("u have valid cookies");
            }
            else
            {
                console.log("invalid cookies, need to get");
            }

            return response.ok;
        } catch (error) {
            console.error("Auth check failed:", error);
            return false;
        }
    },
};