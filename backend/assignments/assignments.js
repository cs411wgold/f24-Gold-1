document.addEventListener("DOMContentLoaded", function() {
    fetchUpcomingAssignments();
});

function fetchUpcomingAssignments() {
    // Define the Canvas API URL for upcoming assignments
    const canvasApiUrl = "https://canvas.odu.edu/api/v1/users/40892/courses/161613/assignments";
    const authToken = "Bearer <YOUR_ACCESS_TOKEN>";  // Replace <YOUR_ACCESS_TOKEN> with your actual access token

    // Fetch the assignments
    fetch(canvasApiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        }
    })
    .then(response => response.json())
    .then(jsonData => {
        // Array to hold assignments that are due today or later
        let upcomingAssignments = [];

        // Get today's date in ISO string format, excluding the time portion for comparison purposes
        let today = new Date().toISOString().split('T')[0];

        // Filter assignments to only include those whose 'due_at' date is today or in the future
        if (Array.isArray(jsonData)) {
            upcomingAssignments = jsonData.filter(assignment => {
                if (assignment.due_at) {
                    let dueDate = new Date(assignment.due_at).toISOString().split('T')[0];
                    return dueDate >= today;
                }
                return false;
            });

            // Sort the assignments by due date in ascending order (closest due date first)
            upcomingAssignments.sort((a, b) => new Date(a.due_at) - new Date(b.due_at));

            // Get the next 3 assignments and only keep 'name' and 'due_at'
            let nextThreeAssignments = upcomingAssignments.slice(0, 3).map(assignment => {
                return {
                    name: assignment.name,
                    due_at: assignment.due_at
                };
            });

            // Display the next three assignments on the home page
            displayUpcomingAssignments(nextThreeAssignments);
        } else {
            console.error("The response does not contain a valid assignments array.");
        }
    })
    .catch(error => {
        console.error("Error fetching assignments:", error);
    });
}

function displayUpcomingAssignments(assignments) {
    const assignmentsContainer = document.getElementById('upcoming-assignments');
    assignmentsContainer.innerHTML = "";  // Clear previous content if any

    assignments.forEach(assignment => {
        // Extract date from due_at in MM/DD format
        let dueDate = new Date(assignment.due_at);
        let month = dueDate.getMonth() + 1; // JavaScript months are 0-11
        let day = dueDate.getDate();

        // Create assignment card HTML
        const assignmentCard = `
            <div class="assignment-card">
                <div class="date">${month}/${day}</div>
                <div class="details">
                    <h3>${assignment.name}</h3>
                </div>
            </div>
        `;
        // Append the assignment card to the container
        assignmentsContainer.innerHTML += assignmentCard;
    });
}
