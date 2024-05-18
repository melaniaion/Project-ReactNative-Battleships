import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://163.172.177.98:8081";

export const registerUser = async (email: string, password: string) => {
    try {
        const payload = JSON.stringify({ email, password });

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error: Something went wrong!");
        }

        return await response.json();
    } catch (registerError) {
        throw registerError;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const payload = JSON.stringify({ email, password });

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error: Something went wrong!");
        }

        const data = await response.json();
        await AsyncStorage.setItem("accessToken", data.accessToken);
        return data.token;

    } catch (loginError) {
        throw loginError;
    }
};

export const getUserDetails = async (): Promise<{
    email: string;
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
  }> => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }
  
      const response = await fetch(`${API_URL}/user/details/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to fetch user details");
      }
  
      const data = await response.json();

      return {
        email: data.user.email,
        currentlyGamesPlaying: data.currentlyGamesPlaying,
        gamesLost: data.gamesLost,
        gamesPlayed: data.gamesPlayed,
        gamesWon: data.gamesWon,
      };
    } catch (userDetailsError) {
      throw userDetailsError;
    }
};

export const getAllGames = async (): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

    const response = await fetch(`${API_URL}/game`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return data;
  } catch (allGamesError) {
    console.error("getAllGames error:", allGamesError);
    throw allGamesError;
  }
};