export async function postOrder(orderDetails) {
    const token = localStorage.getItem("token"); // Get the token from local storage
    try {
<<<<<<< HEAD
        const response = await fetch("http://localhost:5050/orders", { // Ensure this matches your backend endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: Bearer `${token}`, // Include the authorization token
=======
        const response = await fetch("https://server.brzcode.site/orders", { // Ensure this matches your backend endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include the authorization token
>>>>>>> 7cb3df84cf967e5f032ed89043610627afc4892b
            },
            body: JSON.stringify(orderDetails), // Send the order details as the request body
        });

        // Check if the response is not OK
        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            throw new Error(errorData.message || "Failed to create order");
        }

        const data = await response.json(); // Parse the successful response
        return data; // Return the created order data
    } catch (error) {
        console.error("Error creating order:", error); // Log any errors
        return null; // Return null if an error occurs
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 7cb3df84cf967e5f032ed89043610627afc4892b
