/**
 * Initializes and configures a study time chart using Chart.js.
 * Sets up interactive toggle functionality for different assignments.
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('studyTimeChart').getContext('2d');

    /**
     * @typedef {Object} StudyTimeDataset
     * @property {string} label - The name of the assignment
     * @property {number[]} data - Array of study duration values
     * @property {string} borderColor - Color of the line border
     * @property {string} backgroundColor - Color of the line and points
     * @property {number} tension - Line curve tension
     * @property {number} pointRadius - Size of data points
     * @property {number} pointHoverRadius - Size of data points on hover
     */

    /**
     * Configuration object for study time data
     * @type {Object}
     * @property {string[]} labels - Session labels
     * @property {StudyTimeDataset[]} datasets - Array of study time datasets
     */
    const data = {
        labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
        datasets: [
            {
                label: 'CS 390: Homework 5',
                data: [25, 15, 20, 30, 25],
                borderColor: '#0066cc',
                backgroundColor: '#0066cc',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'CS 350: Lab 11',
                data: [10, 20, 15, 25, 20],
                borderColor: '#4d94ff',
                backgroundColor: '#4d94ff',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'CS 330: Homework 6',
                data: [15, 25, 30, 20, 15],
                borderColor: '#99c2ff',
                backgroundColor: '#99c2ff',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    /**
     * Chart.js configuration object
     * @type {Object}
     */
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y} min`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 30,
                    ticks: {
                        stepSize: 5
                    },
                    title: {
                        display: true,
                        text: 'Study Time (minutes)',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Session',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    };

    // Initialize the chart
    const studyTimeChart = new Chart(ctx, config);

    /**
     * Sets up toggle functionality for assignment visibility
     * @param {HTMLElement} button - The toggle button element
     * @listens click
     */
    const toggleButtons = document.querySelectorAll('.assignment-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const assignmentName = button.getAttribute('data-assignment');
            const datasetIndex = data.datasets.findIndex(ds => ds.label === assignmentName);

            const isVisible = studyTimeChart.isDatasetVisible(datasetIndex);
            if (isVisible) {
                studyTimeChart.hide(datasetIndex);
            } else {
                studyTimeChart.show(datasetIndex);
            }
        });
    });
});
