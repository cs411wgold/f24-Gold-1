document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Sample assignment data
    const assignmentData = {
        'CS350': [
            { name: 'Assignment 1', grade: 85 },
            { name: 'Assignment 2', grade: 92 },
            { name: 'Midterm', grade: 88 },
            { name: 'Project', grade: 95 }
        ],
        'CS361': [
            { name: 'Quiz 1', grade: 78 },
            { name: 'Project 1', grade: 85 },
            { name: 'Midterm', grade: 82 },
            { name: 'Final Project', grade: 90 }
        ],
        'CS450': [
            { name: 'Lab 1', grade: 75 },
            { name: 'Assignment 1', grade: 82 },
            { name: 'Midterm', grade: 88 },
            { name: 'Final', grade: 85 }
        ]
    };

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

    courseSelect.addEventListener('change', function() {
        assignmentSelect.innerHTML = '<option value="">Select Assignment</option>';
        assignmentSelect.disabled = !this.value;
        
        if (this.value) {
            assignmentData[this.value].forEach(assignment => {
                const option = document.createElement('option');
                option.value = assignment.name;
                option.textContent = assignment.name;
                assignmentSelect.appendChild(option);
            });
        }
    });

    addDataBtn.addEventListener('click', function() {
        const course = courseSelect.value;
        const assignment = assignmentSelect.value;
        const studyTime = parseInt(studyTimeInput.value);

        if (!course || !assignment || !studyTime) {
            alert('Please fill in all fields');
            return;
        }

        const assignmentInfo = assignmentData[course].find(a => a.name === assignment);
        
        // Add new data points
        data.labels.push(assignment);
        data.datasets[0].data.push(assignmentInfo.grade);
        data.datasets[1].data.push(studyTime);
        
        // Update chart
        chart.update();
        
        // Reset inputs
        studyTimeInput.value = '';
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