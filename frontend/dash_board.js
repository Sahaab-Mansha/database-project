document.addEventListener("DOMContentLoaded", function () {
  // Retrieve student info from localStorage
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

  // Check if studentInfo exists (in case it's null or hasn't been set)
  if (studentInfo) {
    // Update student info in the page
    document.getElementById("name").textContent =
      "Student Name: " + studentInfo.name;
    document.getElementById("roll_no").textContent =
      "Roll Number: " + studentInfo.rollNo;
    document.getElementById("cnic").textContent = "CNIC: " + studentInfo.cnic;
    document.getElementById("section").textContent =
      "Section: " + studentInfo.section;
  } else {
    console.log("Student info not found in localStorage.");
  }
});
