const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

if (!token) {
  console.error("Admin token not found in localStorage");
} else {
  // Make the API request to get student and section counts
  fetch("http://localhost:5000/admin/get-all-students-count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      if (
        data.students_count !== undefined &&
        data.sections_count !== undefined
      ) {
        // Update the DOM with the counts
        document.getElementById("total_students").textContent =
          data.students_count;
        document.getElementById("total_sections").textContent =
          data.sections_count;
      } else {
        // Handle API errors
        console.error("Error: ", data.error || "Unknown error");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
