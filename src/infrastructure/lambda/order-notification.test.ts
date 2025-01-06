async function testOrderNotification() {
	const response = await fetch(
		"http://localhost:3000/dev/notifications/order",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				orderId: "677b37a8cf707659656b4189",
			}),
		},
	);

	const result = await response.json();

	if (result.previewUrl) {
		console.log("View the email at:", result.previewUrl);
	}
}

testOrderNotification();
