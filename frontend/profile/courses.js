/**
 * @fileoverview Handles course registration functionality including dropdown population,
 * course addition/removal, and backend synchronization.
 */

/**
 * Initializes the course registration functionality when the DOM is loaded.
 * Sets up the course dropdown and loads registered courses.
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
    /** Function to populate the dropdown menu with available courses */ 
    function populateCourseDropdown() {
        fetch("http://127.0.0.1:8000/courses/list/")
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); // Log the API response to check its structure

                let courses;

                if (Array.isArray(data.courses)) {
                    courses = data.courses; // Extract the "courses" array from the response
                } else if (Array.isArray(data)) {
                    courses = data; // Handle if the response itself is an array
                } else {
                    console.error("The API response format is incorrect, expected an array of courses.");
                    return;
                }

                 // Filter out the unwanted course
                const filteredCourses = courses.filter(course => course.name !== "Passport to Canvas (Canvas Student Orientation - 2022)");


                // Populate the dropdown menu
                const courseDropdown = document.getElementById("courseDropdown");
                courseDropdown.innerHTML = ""; // Clear existing options

                filteredCourses.forEach(course => {
                    const li = document.createElement("li");
                    const link = document.createElement("a");
                    link.classList.add("dropdown-item");
                    link.textContent = course.name
                    /**
                     * Sets the onclick event handler for the link to add the course.
                     */                    
                    link.onclick = () => addCourse(course);
                    li.appendChild(link);
                    courseDropdown.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching courses:", error));
    }

    /**
     * Loads registered courses from the backend and populates the UI table.
     * @function loadRegisteredCoursesFromBackend
     */
    function loadRegisteredCoursesFromBackend() {
        fetch("http://127.0.0.1:8000/courses/registered/")
            .then(response => response.json())
            .then(courses => {
                console.log("Registered Courses API Response:", courses);
                
                if (!Array.isArray(courses)) {
                    console.error("The API response format is incorrect, expected an array of registered courses.");
                    return;
                }

                // Populate the "Registered Courses" table
                const courseTable = document.getElementById("courseTable");
                courseTable.innerHTML = ""; // Clear existing courses

                courses.forEach(course => {
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.textContent = course.name;
                    tr.appendChild(td);

                    // Add a remove button
                    const removeButtonTd = document.createElement("td");
                    const removeButton = document.createElement("button");
                    removeButton.classList.add("btn", "btn-danger");
                    removeButton.textContent = "Remove";
                    /**
                     * Sets the onclick event handler for the remove button to remove the course.
                     */             
                    removeButton.onclick = () => removeCourse(course.course_id, tr);
                    removeButtonTd.appendChild(removeButton);
                    tr.appendChild(removeButtonTd);

                    // Append the row to the table
                    courseTable.appendChild(tr);
                });
            })
            .catch(error => console.error("Error fetching registered courses:", error));
    }

    // Call functions to populate dropdown and load registered courses
    populateCourseDropdown();
    loadRegisteredCoursesFromBackend();
});

/**
 * Adds a selected course to the registered courses table and syncs with backend.
 * @function addCourse
 * @param {Object} course - The course object to add
 * @param {string} course.name - The name of the course
 * @param {number} course.course_id - The unique identifier of the course
 */
function addCourse(course) {
    const courseTable = document.getElementById("courseTable");

    // Create a new row for the course
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = course.name;
    tr.appendChild(td);

    // Add a remove button
    const removeButtonTd = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger");
    removeButton.textContent = "Remove";
    /**
     * Sets the onclick event handler for the remove button to remove the course.
     */
    removeButton.onclick = () => removeCourse(course.course_id, tr);
    removeButtonTd.appendChild(removeButton);
    tr.appendChild(removeButtonTd);

    // Append the row to the table
    courseTable.appendChild(tr);

    // Save the registered course to the backend
    registerCourseToBackend(course.course_id);
}

/**
 * Registers a course with the backend server.
 * @async
 * @function registerCourseToBackend
 * @param {number} course_id - The ID of the course to register
 * @throws {Error} If the network request fails
 */
function registerCourseToBackend(course_id) {
    fetch("http://127.0.0.1:8000/courses/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_id }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Course registered to backend:", data);
        })
        .catch(error => console.error("Error registering course:", error));
}

/**
 * Removes a course from both the UI table and backend server.
 * @async
 * @function removeCourse
 * @param {number} course_id - The ID of the course to remove
 * @param {HTMLElement} rowElement - The table row element to remove from the UI
 * @throws {Error} If the deletion request fails
 */
function removeCourse(course_id, rowElement) {
    fetch(`http://127.0.0.1:8000/courses/register/${course_id}/`, {
        method: "DELETE",
    })
        .then(() => {
            console.log("Course deleted:", course_id);
            // Remove the course row from the table
            rowElement.remove();
        })
        .catch(error => console.error("Error deleting course:", error));
}

/**
 * Adds a custom course from user input to the registered courses table.
 * Includes validation for empty input and duplicate courses.
 * @function addCustomCourse
 */
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

