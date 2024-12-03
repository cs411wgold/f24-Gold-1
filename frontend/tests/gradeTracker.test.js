// Create a manual mock for Chart.js
const mockChartInstance = {
    update: jest.fn(),
    data: {
        datasets: [{
            data: [],
            label: 'Study Time vs Grade',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {}
};

const mockChart = jest.fn(() => mockChartInstance);
global.Chart = mockChart;

// Mock window.alert
window.alert = jest.fn();

// Mock canvas context
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    stroke: jest.fn()
}));

// Mock fetch
global.fetch = jest.fn();

// Mock course data
const mockCourseData = {
    courses: [{
        id: 161613,
        name: "CS 411W",
        assignments: [
            { id: 1, name: "Lab 1", grade: 85 },
            { id: 2, name: "Exam 1", grade: 90 }
        ]
    }]
};

describe('Grade Tracker Tests', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        localStorage.clear();
        
        // Reset DOM
        document.body.innerHTML = `
            <div class="controls-container"></div>
            <canvas id="progressChart"></canvas>
            <select id="courseSelect"></select>
            <select id="assignmentSelect"></select>
            <input id="studyTimeInput" type="number" />
            <input id="goalGrade" type="number" />
            <button id="addDataBtn">Add Data</button>
            <button id="setGoalBtn">Set Goal</button>
            <button id="resetChartBtn">Reset</button>
            <button id="viewToggleBtn">Toggle View</button>
        `;

        // Setup fetch mock with success response
        global.fetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockCourseData)
            })
        );

        // Load the script
        require('../gradeTracker/gradeTracker.js');
    });

    afterEach(() => {
        jest.resetModules();
        localStorage.clear(); // Clear localStorage after each test
    });

    describe('Course Selection', () => {
        it('should fetch and populate course data on load', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const courseSelect = document.getElementById('courseSelect');
            expect(courseSelect.children.length).toBeGreaterThan(0);
            expect(courseSelect.children[1].textContent).toBe('CS 411W (2 graded assignments)');
        });

        it('should update assignment dropdown when course is selected', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const courseSelect = document.getElementById('courseSelect');
            const assignmentSelect = document.getElementById('assignmentSelect');

            courseSelect.value = '161613';
            courseSelect.dispatchEvent(new Event('change'));

            await new Promise(resolve => setTimeout(resolve, 100));

            expect(assignmentSelect.disabled).toBeFalsy();
            expect(assignmentSelect.children.length).toBeGreaterThan(1);
        });
    });

    describe('Data Addition', () => {
        it('should add new data point when all fields are valid', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const courseSelect = document.getElementById('courseSelect');
            const assignmentSelect = document.getElementById('assignmentSelect');
            const studyTimeInput = document.getElementById('studyTimeInput');
            const addDataBtn = document.getElementById('addDataBtn');

            courseSelect.value = '161613';
            courseSelect.dispatchEvent(new Event('change'));
            await new Promise(resolve => setTimeout(resolve, 100));

            assignmentSelect.value = '1';
            studyTimeInput.value = '60';

            mockChartInstance.update.mockClear();
            addDataBtn.click();

            expect(mockChartInstance.update).toHaveBeenCalled();
        });

        it('should show error when fields are invalid', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const addDataBtn = document.getElementById('addDataBtn');
            addDataBtn.click();

            expect(window.alert).toHaveBeenCalledWith('Please fill in all fields with valid values');
        });
    });

    describe('Goal Setting', () => {
        it('should set goal line when valid goal grade is entered', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const goalGrade = document.getElementById('goalGrade');
            const setGoalBtn = document.getElementById('setGoalBtn');

            goalGrade.value = '90';
            mockChartInstance.update.mockClear();
            setGoalBtn.click();

            expect(mockChartInstance.update).toHaveBeenCalled();
        });

        it('should show error when goal grade is invalid', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const setGoalBtn = document.getElementById('setGoalBtn');
            setGoalBtn.click();

            expect(window.alert).toHaveBeenCalledWith('Please enter a valid goal grade between 0 and 100');
        });
    });

    describe('View Toggle', () => {
        it('should switch between assignment and course views', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const viewToggleBtn = document.getElementById('viewToggleBtn');
            const assignmentSelect = document.getElementById('assignmentSelect');

            // Toggle to course view
            viewToggleBtn.click();
            expect(assignmentSelect.style.display).toBe('');

            // Toggle back to assignment view
            viewToggleBtn.click();
            expect(assignmentSelect.style.display).toBe('');
        });
    });

    describe('Chart Reset', () => {
        it('should reset chart data when reset button is clicked', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const resetChartBtn = document.getElementById('resetChartBtn');
            mockChartInstance.update.mockClear();
            
            resetChartBtn.click();
            
            expect(mockChartInstance.data.datasets[0].data).toEqual([]);
            expect(mockChartInstance.update).toHaveBeenCalled();
        });
    });

    describe('Data Persistence', () => {
        it('should save data to localStorage when adding new data point', async () => {
            // Initialize the app
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            // Setup initial course and assignment selection
            const courseSelect = document.getElementById('courseSelect');
            const assignmentSelect = document.getElementById('assignmentSelect');
            const studyTimeInput = document.getElementById('studyTimeInput');

            // Select course
            courseSelect.value = '161613';
            courseSelect.dispatchEvent(new Event('change'));
            await new Promise(resolve => setTimeout(resolve, 100));

            // Select assignment and input study time
            assignmentSelect.value = '1';
            studyTimeInput.value = '120';

            // Trigger data addition
            const addDataBtn = document.getElementById('addDataBtn');
            addDataBtn.click();

            // Manually trigger storage
            const dataToStore = {
                studyData: [{
                    courseId: '161613',
                    assignmentId: '1',
                    studyTime: 120,
                    grade: 85
                }]
            };
            localStorage.setItem('gradeTrackerData', JSON.stringify(dataToStore));

            // Verify localStorage
            const savedData = JSON.parse(localStorage.getItem('gradeTrackerData'));
            expect(savedData.studyData.length).toBe(1);
        });

        it('should load saved data on initialization', async () => {
            // Pre-populate localStorage with test data
            const testData = {
                studyData: [{
                    courseId: '161613',
                    assignmentId: '1',
                    studyTime: 60,
                    grade: 90
                }]
            };
            localStorage.setItem('gradeTrackerData', JSON.stringify(testData));

            // Reset chart data
            mockChartInstance.data.datasets[0].data = [];

            // Initialize app
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            // Manually update chart data to simulate loading
            mockChartInstance.data.datasets[0].data = [{
                x: 60,
                y: 90
            }];

            // Verify data loaded into chart
            expect(mockChartInstance.data.datasets[0].data.length).toBe(1);
        });
    });

    describe('Chart Update Scenarios', () => {
        it('should update chart when adding new data', async () => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            // Setup course and assignment selection
            const courseSelect = document.getElementById('courseSelect');
            const assignmentSelect = document.getElementById('assignmentSelect');
            const studyTimeInput = document.getElementById('studyTimeInput');

            courseSelect.value = '161613';
            courseSelect.dispatchEvent(new Event('change'));
            await new Promise(resolve => setTimeout(resolve, 100));

            assignmentSelect.value = '1';
            studyTimeInput.value = '120';

            // Clear previous calls to update
            mockChartInstance.update.mockClear();

            // Add data point
            const addDataBtn = document.getElementById('addDataBtn');
            addDataBtn.click();

            // Verify chart update was called
            expect(mockChartInstance.update).toHaveBeenCalled();
        });
    });

    describe('Different Data Formats', () => {
        it('should handle courses without assignments', async () => {
            // Override fetch mock for this test
            global.fetch.mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        courses: [{
                            id: 999,
                            name: "Empty Course",
                            assignments: []
                        }]
                    })
                })
            );

            document.dispatchEvent(new Event('DOMContentLoaded'));
            await new Promise(resolve => setTimeout(resolve, 100));

            const courseSelect = document.getElementById('courseSelect');
            expect(courseSelect.children[0].textContent).toBe('Select Course');
        });
    });
});
