document.addEventListener("DOMContentLoaded", function () {
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

  // Check if studentInfo exists
  if (studentInfo) {
    // Get the roll number from the studentInfo object
    const rollNo = studentInfo.rollNo;

    // Output the rollNo or use it in your application
    console.log("Roll Number:", rollNo);
  } else {
    console.log("Student info not found in localStorage.");
  }

  // API endpoint
  const apiUrl = "http://localhost:5000/student/get-grades";

  // Function to determine the grade based on percentage
  function calculateGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    return "F"; // Fail for anything below 60
  }

  // Get the table body element where rows will be appended
  const tableBody = document.getElementById("tbody");

  // Clear any existing rows
  tableBody.innerHTML = "";

  // Function to fetch grades from the API
  async function fetchGrades() {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNo: studentInfo.rollNo,
          token: localStorage.token,
        }), // Send rollNo in the request body
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch grades from the API");
      }

      // Parse the response JSON data
      const data = await response.json();

      // Check if the response contains grades
      if (data && Array.isArray(data)) {
        // Loop through each data entry and create a new row
        data.forEach((item) => {
          // Create a new table row
          const row = document.createElement("tr");

          // Create and append the "Session Name" cell
          const sessionCell = document.createElement("td");
          sessionCell.classList.add("border", "px-4", "py-2", "text-center");
          sessionCell.textContent = item.term;

          // Create and append the "Percentage" cell
          const percentageCell = document.createElement("td");
          percentageCell.classList.add("border", "px-4", "py-2", "text-center");
          percentageCell.textContent = item.percentage + "%";

          // Create and append the "Grade" cell
          const gradeCell = document.createElement("td");
          gradeCell.classList.add("border", "px-4", "py-2", "text-center");
          gradeCell.textContent = calculateGrade(item.percentage);

          // Append all cells to the row
          row.appendChild(sessionCell);
          row.appendChild(percentageCell);
          row.appendChild(gradeCell);

          // Append the row to the table body
          tableBody.appendChild(row);
        });
      } else {
        throw new Error("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
      // Optionally, show a message to the user
      const errorRow = document.createElement("tr");
      const errorCell = document.createElement("td");
      errorCell.setAttribute("colspan", 3);
      errorCell.classList.add(
        "border",
        "px-4",
        "py-2",
        "text-center",
        "text-red-500"
      );
      errorCell.textContent = "Failed to fetch grades. Please try again.";
      errorRow.appendChild(errorCell);
      tableBody.appendChild(errorRow);
    }
  }

  // Call the fetchGrades function to populate the table
  fetchGrades();
});
