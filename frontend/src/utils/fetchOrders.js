export async function fetchOrders() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://server.brzcode.site/orders/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch order details");
    }

    const data = await response.json();
    return data.orders; 
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
}
