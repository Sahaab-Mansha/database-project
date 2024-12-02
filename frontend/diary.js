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

  // Define the API endpoint URL
  const apiUrl = "http://localhost:5000/student/get-diary";

  // Get the container where entries will be added
  const diaryContainer = document.getElementById("diaryEntries");

  // Clear any existing content (optional, in case you want to overwrite previous content)
  diaryContainer.innerHTML = "";

  // Send POST request with rollNo in the request body
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rollNo: studentInfo.rollNo,
      token: localStorage.token,
    }), // Send the rollNo as JSON
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((diaryData) => {
      // Check if the response contains diary data
      if (Array.isArray(diaryData) && diaryData.length > 0) {
        // Loop through each diary entry and create the entry card dynamically
        diaryData.forEach((entry) => {
          // Create the main card div
          const entryCard = document.createElement("div");
          entryCard.classList.add(
            "bg-white",
            "border",
            "border-slate-800",
            "shadow-lg",
            "rounded-lg",
            "p-4",
            "hover:shadow-xl",
            "transition-shadow"
          );

          // Create the date heading
          const dateHeading = document.createElement("h3");
          dateHeading.classList.add("text-lg", "font-bold", "text-gray-800");
          dateHeading.textContent = "Date: " + entry.date;

          // Create the diary content paragraph
          const diaryParagraph = document.createElement("p");
          diaryParagraph.classList.add("text-gray-600", "mt-2");
          diaryParagraph.textContent = entry.text;

          // Append the date heading and diary content to the entry card
          entryCard.appendChild(dateHeading);
          entryCard.appendChild(diaryParagraph);

          // Append the entry card to the container
          diaryContainer.appendChild(entryCard);
        });
      } else {
        // Handle case where no diary data is available
        const noDataMessage = document.createElement("div");
        noDataMessage.classList.add(
          "col-span-3",
          "text-center",
          "text-gray-600",
          "py-4"
        );
        noDataMessage.textContent = "No diary entries available.";
        diaryContainer.appendChild(noDataMessage);
      }
    })
    .catch((error) => {
      console.error("Error fetching diary data:", error);
      const errorMessage = document.createElement("div");
      errorMessage.classList.add(
        "col-span-3",
        "text-center",
        "text-red-500",
        "py-4"
      );
      errorMessage.textContent = "Failed to load diary entries.";
      diaryContainer.appendChild(errorMessage);
    });
});
