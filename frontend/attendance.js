document.addEventListener("DOMContentLoaded", function () {
  // Define the API endpoint URL
  const apiUrl = "http://localhost:5000/student/get-attendance";

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

  // Get the table body element
  const tbody = document.querySelector("#attendance tbody");

  // Clear any existing rows (optional, in case you want to overwrite)
  tbody.innerHTML = "";

  // Fetch attendance data from the API
  fetch(apiUrl, {
    method: "POST", // Use POST to send data
    headers: {
      "Content-Type": "application/json", // Sending JSON data
    },
    body: JSON.stringify({
      rollNo: studentInfo.rollNo,
      token: localStorage.token,
    }), // Send rollNo in the body of the request
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((attendanceData) => {
      // Check if the response is not empty
      if (Array.isArray(attendanceData) && attendanceData.length > 0) {
        // Loop through the attendance data and create table rows
        attendanceData.forEach((data) => {
          const row = document.createElement("tr");

          // Date cell
          const dateCell = document.createElement("td");
          dateCell.classList.add(
            "border",
            "border-gray-300",
            "px-4",
            "py-2",
            "text-center"
          );
          dateCell.textContent = data.date;

          // Status cell
          const statusCell = document.createElement("td");
          statusCell.classList.add(
            "border",
            "border-gray-300",
            "px-4",
            "py-2",
            "text-center",
            "font-semibold"
          );
          statusCell.textContent = data.present ? "Present" : "Absent";
          statusCell.classList.add(
            data.present ? "text-green-500" : "text-red-500"
          );

          // Remarks cell
          const remarksCell = document.createElement("td");
          remarksCell.classList.add(
            "border",
            "border-gray-300",
            "px-4",
            "py-2",
            "text-center"
          );
          remarksCell.textContent = data.present ? "On time" : "N/A";

          // Append the cells to the row
          row.appendChild(dateCell);
          row.appendChild(statusCell);
          row.appendChild(remarksCell);

          // Append the row to the table body
          tbody.appendChild(row);
        });
      } else {
        // Handle empty data or error in API response
        const row = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.setAttribute("colspan", "3");
        noDataCell.classList.add("text-center", "py-4");
        noDataCell.textContent = "No attendance data available";
        row.appendChild(noDataCell);
        tbody.appendChild(row);
      }
    })
    .catch((error) => {
      console.error("Error fetching attendance data:", error);
      const row = document.createElement("tr");
      const errorCell = document.createElement("td");
      errorCell.setAttribute("colspan", "3");
      errorCell.classList.add("text-center", "py-4", "text-red-500");
      errorCell.textContent = "Failed to load attendance data.";
      row.appendChild(errorCell);
      tbody.appendChild(row);
    });
});
