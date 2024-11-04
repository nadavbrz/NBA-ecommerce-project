export async function postOrder(orderDetails) {
    const token = localStorage.getItem("token"); 
    try {
        const response = await fetch("https://server.brzcode.site/orders", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: Bearer `${token}`, 
            },
            body: JSON.stringify(orderDetails), 
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || "Failed to create order");
        }

        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error("Error creating order:", error); 
        return null; 
    }
}
