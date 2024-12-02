function postDiary(event) {
  event.preventDefault();

  // Get the section and diary text values from the form
  const diaryText = document.getElementById("diaryText").value.trim();
  const section = document.getElementById("section").value.trim();
  console.log(diaryText, section);
  // Check if section or diary text is empty
  if (!diaryText || !section) {
    alert("Please provide both the section and diary text!");
    return;
  }

  // Get the admin token from local storage
  const token = localStorage.getItem("token"); // Replace 'adminToken' with the actual key in local storage

  if (!token) {
    alert("Admin token is missing. Please log in.");
    return;
  }

  // Prepare the data to send to the API
  const postData = {
    token: token,
    section: section,
    text: diaryText,
  };

  // Make the API call to post the diary entry
  fetch("http://localhost:5000/admin/post-diary", {
    // Update the URL to localhost:5000
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error); // Display the error from the API
      } else {
        // Append the new diary entry to the diary grid
        const currentDate = new Date().toISOString().split("T")[0];
        const diaryContainer = document.querySelector(".diary-grid");
        const newDiaryCard = document.createElement("div");
        newDiaryCard.className = "diary-card";
        newDiaryCard.innerHTML = `
          <h3 class="diary-date">Date: ${currentDate}</h3>
          <h4 class="diary-section">Section: ${section}</h4>
          <p class="diary-text">${diaryText}</p>
        `;
        diaryContainer.prepend(newDiaryCard);

        // Clear the form inputs
        document.getElementById("diaryText").value = "";
        document.getElementById("section").value = "";
        alert("Diary entry posted successfully!");
      }
    })
    .catch((error) => {
      alert("An error occurred while posting the diary entry.");
      console.error("Error:", error);
    });
}

// Function to post a new diary entry
function postDiary(event) {
  event.preventDefault();

  // Get the section and diary text values from the form
  const diaryText = document.getElementById("diaryText").value.trim();
  const section = document.getElementById("section").value.trim();

  // Check if section or diary text is empty
  if (!diaryText || !section) {
    alert("Please provide both the section and diary text!");
    return;
  }

  // Get the admin token from local storage
  const token = localStorage.getItem("token"); // Replace 'adminToken' with the actual key in local storage

  if (!token) {
    alert("Admin token is missing. Please log in.");
    return;
  }

  // Prepare the data to send to the API
  const postData = {
    token: token,
    section: section,
    text: diaryText,
  };

  // Make the API call to post the diary entry
  fetch("http://localhost:5000/admin/post-diary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error); // Display the error from the API
      } else {
        // Append the new diary entry to the diary grid
        const currentDate = new Date().toISOString().split("T")[0];
        const diaryContainer = document.querySelector(".diary-grid");
        const newDiaryCard = document.createElement("div");
        newDiaryCard.className = "diary-card";
        newDiaryCard.innerHTML = `
          <h3 class="diary-date">Date: ${currentDate}</h3>
          <h4 class="diary-section">Section: ${section}</h4>
          <p class="diary-text">${diaryText}</p>
        `;
        diaryContainer.prepend(newDiaryCard);

        // Clear the form inputs
        document.getElementById("diaryText").value = "";
        document.getElementById("section").value = "";
        alert("Diary entry posted successfully!");
      }
    })
    .catch((error) => {
      alert("An error occurred while posting the diary entry.");
      console.error("Error:", error);
    });
}

// Function to fetch and display previous diaries when the page loads
window.onload = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Admin token is missing. Please log in.");
    return;
  }

  // Prepare the data to send to the API
  const postData = { token: token };

  // Make the API call to get all diaries
  fetch("http://localhost:5000/admin/get-diaries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error); // Display the error from the API
      } else {
        // Iterate through each diary entry and append it to the diary section
        const diaryContainer = document.querySelector(".diary-grid");
        data.forEach((diary) => {
          const diaryCard = document.createElement("div");
          diaryCard.className = "diary-card";
          diaryCard.innerHTML = `
            <h3 class="diary-date">Date: ${diary.date}</h3>
            <h4 class="diary-section">Section: ${diary.section}</h4>
            <p class="diary-text">${diary.text}</p>
          `;
          diaryContainer.appendChild(diaryCard);
        });
      }
    })
    .catch((error) => {
      alert("An error occurred while fetching the diaries.");
      console.error("Error:", error);
    });
};
