// Function to add a course to the table
function addCourse(courseName) {
    const tableBody = document.getElementById("courseTable");

    // Check if course is already in the table
    const coursesInTable = Array.from(tableBody.getElementsByTagName("tr"));
    if (coursesInTable.some(row => row.cells[0].textContent === courseName)) {
        alert("This course is already added!");
        return;
    }

    // Create a new row with the course name and a remove button
    const row = document.createElement("tr");
        
    // Assign course name to table data
    const courseNameCell = document.createElement("td");
    courseNameCell.textContent = courseName;
    row.appendChild(courseNameCell);

    // Add remove button cell next to course
    const removeButtonCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.onclick = function() {
        removeCourse(row);
    };
    removeButtonCell.appendChild(removeButton);
    row.appendChild(removeButtonCell);

    // Add new row to table
    tableBody.appendChild(row);
}

// Function to add a custom course from the input field
    function addCustomCourse() {
        const courseInput = document.getElementById("customCourse");
        const courseName = courseInput.value.trim(); //trim input to help clear white space
    
        // Check if the input is empty and send alert
        if (courseName === "") {
            alert("Please enter a course name.");
            return;
        }
    
        // Check if the course is already in the table
        const tableBody = document.getElementById("courseTable");
        const coursesInTable = Array.from(tableBody.getElementsByTagName("tr"));
        if (coursesInTable.some(row => row.cells[0].textContent === courseName)) {
            alert("This course is already added!");
            return;
        }
    
        // Create a new row with the course name and a remove button
        const row = document.createElement("tr");
            
        // Assign course name to table data
        const courseNameCell = document.createElement("td");
        courseNameCell.textContent = courseName;
        row.appendChild(courseNameCell);
    
        // Add remove button cell next to course
        const removeButtonCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.onclick = function() {
            removeCourse(row);
        };
        removeButtonCell.appendChild(removeButton);
        row.appendChild(removeButtonCell);

        // Add new row to table
        tableBody.appendChild(row);
    
        // Clear the input field after course is added to table
        courseInput.value = "";
}

// Function to remove a course from the table with remove button
function removeCourse(row) {
    const tableBody = document.getElementById("courseTable");
    tableBody.removeChild(row);
}