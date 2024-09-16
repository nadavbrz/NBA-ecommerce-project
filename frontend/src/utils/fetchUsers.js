export async function fetchUser() {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:5050/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
  
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  }
  