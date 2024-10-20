document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('progressChart').getContext('2d');

    // Sample data
    const data = {
        labels: [0, 10, 20, 30, 40],
        datasets: [
            {
                label: 'CS 350',
                data: [15, 35, 78, 89, 98],
                borderColor: '#0066cc',
                backgroundColor: '#0066cc',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'CS 361',
                data: [8, 27, 56, 68, 79],
                borderColor: '#4d94ff',
                backgroundColor: '#4d94ff',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'CS 450',
                data: [25, 50, 27, 76, 85],
                borderColor: '#99c2ff',
                backgroundColor: '#99c2ff',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    // Chart configuration
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
                            return `${context.dataset.label}: ${context.parsed.y}%`;
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
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    title: {
                        display: true,
                        text: 'Grade (%)',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Study Time (min)',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    };

    // Initialize the chart
    const progressChart = new Chart(ctx, config);

    // Toggle functionality for course buttons
    const toggleButtons = document.querySelectorAll('.course-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const courseName = button.getAttribute('data-course');
            const datasetIndex = data.datasets.findIndex(ds => ds.label === courseName);

            const isVisible = progressChart.isDatasetVisible(datasetIndex);
            if (isVisible) {
                progressChart.hide(datasetIndex);
            } else {
                progressChart.show(datasetIndex);
            }
        });
    });
});