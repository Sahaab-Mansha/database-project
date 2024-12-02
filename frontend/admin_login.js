document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.getElementById("form");

  // Attach the event listener to the form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from the form
    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;

    // Define the API URL
    const apiUrl = "http://localhost:5000/admin/login";

    // Send the login request to the API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Send as JSON
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains student info
        if (data?.token) {
          // Store the student info in localStorage
          localStorage.setItem("token", data.token);

          window.location.href = "./admin-dashboard.html";
        } else {
          alert("Invalid credentials or login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      });
  });
});
