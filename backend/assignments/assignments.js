async function fetchAssignments() {
    const canvasApiUrl = "https://canvas.odu.edu/api/v1/users/40892/courses/161613/assignments";
    const authToken = "21066~GhuReAXccZe732w4RytQDT86FktFUTAGnL4VPweHkVYNn4k7FaZQDGAwyAcKzV3r";

    try {
        const response = await fetch(canvasApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Map the response to match the Assignment model attributes
        const assignments = data.map(assignment => ({
            id: assignment.id,
            name: assignment.name,
            description: assignment.description || null,
            course_id: assignment.course_id || null,
            due_at: assignment.due_at ? new Date(assignment.due_at) : null,
            points_possible: assignment.points_possible || null,
            grading_type: assignment.grading_type || null,
            submission_types: assignment.submission_types ? assignment.submission_types.join(", ") : null
        }));

        console.log(assignments);
        return assignments;

    } catch (error) {
        console.error("Error fetching assignments:", error);
        return [];
    }
}

// Call the function to fetch assignments
fetchAssignments();
