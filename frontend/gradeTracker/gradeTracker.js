/**
 * @fileoverview Grade Tracker visualization component that displays student grades and study time
 * in a chart format, allowing students to track their academic progress and study habits.
 * @requires Chart.js
 * @requires Chart.js-annotation-plugin
 */

/**
 * @typedef {Object} Assignment
 * @property {number} id - Unique identifier for the assignment
 * @property {string} name - Name of the assignment
 * @property {number|null} grade - Grade received for the assignment (0-100 or null if not graded)
 */

/**
 * @typedef {Object} Course
 * @property {number} id - Unique identifier for the course
 * @property {string} name - Name of the course
 * @property {Assignment[]} assignments - Array of assignments for the course
 */

/**
 * @typedef {Object} ChartDataset
 * @property {string} label - Label for the dataset
 * @property {number[]} data - Array of numerical values
 * @property {string} backgroundColor - Color for the chart bars
 * @property {string} borderColor - Color for the chart borders
 * @property {number} borderWidth - Width of the chart borders
 * @property {string} yAxisID - ID of the y-axis this dataset corresponds to
 */

/**
 * Main initialization function that sets up the grade tracker chart and event listeners.
 * This function is called when the DOM content is loaded.
 * 
 * @function
 * @listens DOMContentLoaded
 */
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
            backgroundColor: '#ff4444',
            borderColor: '#ff4444',
            borderWidth: 1,
            yAxisID: 'y1'
        }]
    };

    // Add view toggle button
    const viewToggleBtn = document.createElement('button');
    viewToggleBtn.className = 'btn btn-outline-primary mb-3';
    viewToggleBtn.textContent = 'Switch to Course View';
    document.querySelector('.controls-container').prepend(viewToggleBtn);

    let isAssignmentView = true;

    // Modify chart configuration
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
                    max: isAssignmentView ? 90 : 20,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Study Time'
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return isAssignmentView ? 
                                value + ' min' : 
                                value + ' hrs';
                        },
                        ...(isAssignmentView ? {
                            stepSize: 10,
                            callback: function(value) {
                                if ([0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(value)) {
                                    return value + ' min';
                                }
                                return null;  // Hide other ticks
                            }
                        } : {
                            stepSize: 2,
                            callback: function(value) {
                                return value + ' hrs';
                            }
                        })
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Assignments' // Will be updated based on view
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
                            borderWidth: 4,
                            borderDash: [10, 10],
                            label: {
                                content: 'Goal',
                                display: true,
                                backgroundColor: '#ff4444',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                padding: 6
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
    const resetChartBtn = document.getElementById('resetChartBtn');

    // Add this new event listener
    resetChartBtn.addEventListener('click', function() {
        // Clear all data
        data.labels = [];
        data.datasets[0].data = [];
        data.datasets[1].data = [];
        
        // Reset goal line
        config.options.plugins.annotation.annotations.goalLine.display = false;
        goalGradeInput.value = '';
        
        // Update the chart
        chart.update();
        
        // Reset course selection and re-populate assignments
        courseSelect.dispatchEvent(new Event('change'));
    });

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

    /**
     * Event handler for course selection changes. Updates the assignment dropdown
     * based on the selected course.
     * 
     * @function
     * @param {Event} event - Change event from the course select element
     */
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

    /**
     * Event handler for adding new data points to the chart. Validates input and
     * updates the chart with new grade and study time information.
     * 
     * @function
     * @param {Event} event - Click event from the add data button
     */
    addDataBtn.addEventListener('click', function() {
        if (isAssignmentView) {
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
                // Limit data to 2 entries by removing oldest entry if necessary
                if (data.labels.length >= 2) {
                    data.labels.shift();  // Remove first label
                    data.datasets[0].data.shift();  // Remove first grade
                    data.datasets[1].data.shift();  // Remove first study time
                }

                // Add new data point
                data.labels.push(assignmentInfo.name);
                data.datasets[0].data.push(assignmentInfo.grade);
                data.datasets[1].data.push(studyTime);
            }
            
            // Update chart
            chart.update();
            
            // Reset inputs
            studyTimeInput.value = '';
            assignmentSelect.value = '';

            // Update available assignments in dropdown
            courseSelect.dispatchEvent(new Event('change'));
        } else {
            // Course view logic
            const course = courseSelect.value;
            const studyTime = parseFloat(studyTimeInput.value);

            if (!course || isNaN(studyTime) || studyTime <= 0) {
                alert('Please fill in all fields with valid values');
                return;
            }

            const courseData = window.assignmentData.find(c => c.id === parseInt(course));
            if (!courseData) {
                alert('Course not found');
                return;
            }

            // Calculate course average
            const grades = courseData.assignments
                .filter(a => a.grade !== null)
                .map(a => a.grade);
            const avgGrade = grades.length > 0 ? 
                grades.reduce((a, b) => a + b) / grades.length : 
                0;

            // Update chart with course data
            const existingIndex = data.labels.indexOf(courseData.name);
            if (existingIndex !== -1) {
                // Update existing data point
                data.datasets[0].data[existingIndex] = avgGrade;
                data.datasets[1].data[existingIndex] = studyTime;
            } else {
                // Limit data to 2 entries by removing oldest entry if necessary
                if (data.labels.length >= 2) {
                    data.labels.shift();  // Remove first label
                    data.datasets[0].data.shift();  // Remove first grade
                    data.datasets[1].data.shift();  // Remove first study time
                }

                // Add new data point
                data.labels.push(courseData.name);
                data.datasets[0].data.push(avgGrade);
                data.datasets[1].data.push(studyTime);
            }

            chart.update();
            studyTimeInput.value = '';
        }
    });

    /**
     * Event handler for setting a goal grade line on the chart. Validates the
     * input grade and updates the chart's annotation.
     * 
     * @function
     * @param {Event} event - Click event from the set goal button
     */
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

    // Add view toggle handler
    viewToggleBtn.addEventListener('click', function() {
        isAssignmentView = !isAssignmentView;
        
        // Update button text
        this.textContent = isAssignmentView ? 
            'Switch to Course View' : 
            'Switch to Assignment View';

        // Update chart labels and axes
        config.options.scales.y1.title.text = isAssignmentView ? 
            'Study Time (minutes)' : 
            'Study Time (hours/week)';
        config.options.scales.x.title.text = isAssignmentView ? 
            'Assignments' : 
            'Courses';
        
        // Update y1 axis configuration based on view
        config.options.scales.y1 = {
            ...config.options.scales.y1,
            beginAtZero: true,
            max: isAssignmentView ? 90 : 20,
            position: 'right',
            grid: {
                drawOnChartArea: false
            },
            ticks: isAssignmentView ? {
                stepSize: 10,
                callback: function(value) {
                    if ([0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(value)) {
                        return value + ' min';
                    }
                    return null;  // Hide other ticks
                }
            } : {
                stepSize: 2,
                callback: function(value) {
                    return value + ' hrs';
                }
            }
        };

        // Show/hide relevant controls
        document.getElementById('assignmentSelect').style.display = 
            isAssignmentView ? 'block' : 'none';
        studyTimeInput.placeholder = isAssignmentView ? 
            'Study Time (minutes)' : 
            'Study Time (hours/week)';

        // Clear chart data
        data.labels = [];
        data.datasets[0].data = [];
        data.datasets[1].data = [];
        chart.update();

        // Reset inputs
        studyTimeInput.value = '';
        courseSelect.value = '';
        if (isAssignmentView) {
            assignmentSelect.value = '';
        }
    });
});