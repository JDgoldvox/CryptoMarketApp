export const AuthService = {

    login: (accessToken: string, refreshToken: string) => {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
    },

    // Check if we have a refresh token (our "logged in" flag)
    isAuthenticated: () => {
        return !!sessionStorage.getItem("refreshToken");
    },

    // Get the Access Token for your API calls
    getAccessToken: () => {
        return sessionStorage.getItem("accessToken");
    },
   
};