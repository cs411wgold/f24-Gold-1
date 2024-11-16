document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Initialize chart with empty data
    const data = {
        labels: [],
        datasets: [{
            label: 'Grade',
            data: [],
            backgroundColor: '#0066cc',
            borderColor: '#0066cc',
            borderWidth: 1,
            yAxisID: 'y'
        }, {
            label: 'Study Time',
            data: [],
            backgroundColor: '#ff9933',
            borderColor: '#ff9933',
            borderWidth: 1,
            yAxisID: 'y1'
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Grade (%)'
                    }
                },
                y1: {
                    beginAtZero: true,
                    max: 90,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Study Time (minutes)'
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        stepSize: 10,
                        callback: function(value) {
                            return value + ' min';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Assignments'
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        goalLine: {
                            type: 'line',
                            yMin: 0,
                            yMax: 0,
                            borderColor: '#ff4444',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'Goal',
                                display: true
                            },
                            display: false
                        }
                    }
                }
            },
            barPercentage: 0.8,
            categoryPercentage: 0.9,
            grouped: true
        }
    };

    const chart = new Chart(ctx, config);

    // Event Listeners
    const courseSelect = document.getElementById('courseSelect');
    const assignmentSelect = document.getElementById('assignmentSelect');
    const studyTimeInput = document.getElementById('studyTimeInput');
    const addDataBtn = document.getElementById('addDataBtn');
    const goalGradeInput = document.getElementById('goalGrade');
    const setGoalBtn = document.getElementById('setGoalBtn');

    // Fetch courses and assignments data
    fetch('http://127.0.0.1:8000/gradetracker/courses-assignments/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Received courses data:", data); // Debug log
            
            courseSelect.innerHTML = '<option value="">Select Course</option>';
            
            // Get CS 411W data from backend
            const cs411w = data.courses.find(course => course.id === 161613);
            
            // Combine backend data with hardcoded courses
            const allCourses = [
                cs411w, // Real CS 411W data from backend
                {
                    id: 350,
                    name: "CS 350 - Introduction to Software Engineering",
                    assignments: [
                        { id: 1, name: "Project Plan", grade: 95 },
                        { id: 2, name: "Requirements Doc", grade: 88 },
                        { id: 3, name: "Final Project", grade: 92 }
                    ]
                },
                {
                    id: 361,
                    name: "CS 361 - Data Structures and Algorithms",
                    assignments: [
                        { id: 4, name: "Binary Trees", grade: 85 },
                        { id: 5, name: "Sorting Algorithms", grade: 90 },
                        { id: 6, name: "Graph Theory", grade: 87 }
                    ]
                },
                {
                    id: 417,
                    name: "CS 417 - Computational Methods",
                    assignments: [
                        { id: 7, name: "Linear Systems", grade: 89 },
                        { id: 8, name: "Numerical Integration", grade: 93 },
                        { id: 9, name: "Differential Equations", grade: 91 }
                    ]
                }
            ];
            
            // Add all courses to the dropdown
            allCourses.forEach(course => {
                if (course) { // Check if course exists
                    const option = document.createElement('option');
                    option.value = course.id;
                    option.textContent = course.name;
                    
                    // Add count of graded assignments
                    const assignmentsWithGrades = course.assignments.filter(a => a.grade !== null).length;
                    if (assignmentsWithGrades > 0) {
                        option.textContent += ` (${assignmentsWithGrades} graded assignments)`;
                    }
                    courseSelect.appendChild(option);
                }
            });
            
            // Store all courses data for later use
            window.assignmentData = allCourses.filter(course => course !== null);
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            courseSelect.innerHTML = '<option value="">Error: ' + error.message + '</option>';
            courseSelect.disabled = true;
        });

    courseSelect.addEventListener('change', function() {
        const selectedCourse = this.value;
        
        // Clear and update assignment dropdown
        assignmentSelect.innerHTML = '<option value="">Select Assignment</option>';
        
        if (selectedCourse) {
            const courseData = window.assignmentData.find(course => course.id === parseInt(selectedCourse));
            if (courseData && courseData.assignments) {
                // Only show assignments that have grades and aren't already in the chart
                const gradedAssignments = courseData.assignments.filter(a => 
                    a.grade !== null && !data.labels.includes(a.name)
                );
                
                gradedAssignments.forEach(assignment => {
                    const option = document.createElement('option');
                    option.value = assignment.id;
                    option.textContent = `${assignment.name} (Grade: ${assignment.grade}%)`;
                    assignmentSelect.appendChild(option);
                });
                
                // Enable the dropdown if there are available assignments
                assignmentSelect.disabled = gradedAssignments.length === 0;
                if (gradedAssignments.length === 0) {
                    assignmentSelect.innerHTML = '<option value="">No more assignments available</option>';
                }
            }
        } else {
            assignmentSelect.disabled = true;
        }
    });

    addDataBtn.addEventListener('click', function() {
        const course = courseSelect.value;
        const assignment = assignmentSelect.value;
        const studyTime = parseInt(studyTimeInput.value);

        if (!course || !assignment || isNaN(studyTime) || studyTime <= 0) {
            alert('Please fill in all fields with valid values');
            return;
        }

        const courseData = window.assignmentData.find(c => c.id === parseInt(course));
        if (!courseData) {
            alert('Course not found');
            return;
        }

        const assignmentInfo = courseData.assignments.find(a => a.id === parseInt(assignment));
        if (!assignmentInfo) {
            alert('Assignment not found');
            return;
        }

        if (assignmentInfo.grade === null) {
            alert('No grade available for this assignment');
            return;
        }

        // Check if assignment is already in chart
        const existingIndex = data.labels.indexOf(assignmentInfo.name);
        if (existingIndex !== -1) {
            // Update existing data point
            data.datasets[0].data[existingIndex] = assignmentInfo.grade;
            data.datasets[1].data[existingIndex] = studyTime;
        } else {
            // Add new data point
            data.labels.push(assignmentInfo.name);
            data.datasets[0].data.push(assignmentInfo.grade);
            data.datasets[1].data.push(studyTime);
        }
        
        // Update chart
        chart.update();
        
        // Reset only the study time input and keep assignment dropdown enabled
        studyTimeInput.value = '';
        assignmentSelect.value = '';  // Reset selection but keep dropdown enabled
    });

    setGoalBtn.addEventListener('click', function() {
        const goalGrade = parseInt(goalGradeInput.value);
        if (goalGrade >= 0 && goalGrade <= 100) {
            config.options.plugins.annotation.annotations.goalLine.yMin = goalGrade;
            config.options.plugins.annotation.annotations.goalLine.yMax = goalGrade;
            config.options.plugins.annotation.annotations.goalLine.display = true;
            chart.update();
        } else {
            alert('Please enter a valid goal grade between 0 and 100');
        }
    });
});