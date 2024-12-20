document.addEventListener("DOMContentLoaded", function () {
    setupDate();
    document.getElementById('saveTaskBtn').addEventListener('click', saveTask);

    // Fetch assignments and display them on the calendar
    fetchAssignmentsAndDisplay(new Date());
});

let currentDay = ''; // Used to track the selected day for adding tasks

/**
 * Fetches assignments from the server and displays them on the calendar
 * @param {Date} date - The date to display the calendar for
 */
function fetchAssignmentsAndDisplay(date) {
    fetch("http://127.0.0.1:8000/assignments/list/")
        .then(response => response.json())
        .then(data => {
            const assignments = data.assignments || [];
            setupDate(date, assignments);
        })
        .catch(error => console.error("Error fetching assignments:", error));
}

/**
 * Sets up the calendar display for a specific month and renders assignments
 * @param {Date} [date=new Date()] - The date to display the calendar for
 * @param {Array} [assignments=[]] - Array of assignment objects to display
 */
function setupDate(date = new Date(), assignments = []) {
    const monthHeading = document.querySelector('.month h2');
    const daysContainer = document.querySelector('.days');
    const currentDate = date;
    const numeralMonth = currentDate.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[numeralMonth];
    const year = currentDate.getFullYear();

    monthHeading.textContent = `${monthName} ${year}`;
    const daysInMonth = new Date(year, numeralMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, numeralMonth, 1).getDay();
    const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    daysContainer.innerHTML = ''; // Clear previous days

    // Add empty slots for the first week (to align the starting day)
    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyLi = document.createElement('li');
        emptyLi.style.visibility = 'hidden';
        daysContainer.appendChild(emptyLi);
    }

    // Render the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayLi = document.createElement('li');
        dayLi.classList.add('date-box');

        // Add event listener to open the task modal when the date box is clicked
        dayLi.addEventListener('click', function () {
            openTaskModal(day, numeralMonth, year);
        });

        const dayContentDiv = document.createElement('div');
        dayContentDiv.classList.add('day-content');

        const daySpan = document.createElement('span');
        daySpan.textContent = day;
        dayContentDiv.appendChild(daySpan);
        dayLi.appendChild(dayContentDiv);

        let savedTasks = JSON.parse(localStorage.getItem(`${year}-${numeralMonth}-${day}`)) || [];
        savedTasks = sortTasksByTime(savedTasks);

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.style.display = savedTasks.length > 0 ? 'block' : 'none';

        taskDiv.innerHTML = '';
        // savedTasks.forEach((taskObj, index) => {
        //     const taskItem = document.createElement('div');
        //     taskItem.classList.add('task-item');
        //     taskItem.textContent = `${taskObj.task} at ${convertTo12Hour(taskObj.time)}`;

        //     const deleteButton = document.createElement('button');
        //     deleteButton.textContent = "Delete";
        //     deleteButton.classList.add('delete-task-btn');
        //     deleteButton.addEventListener('click', function (e) {
        //         e.stopPropagation();
        //         deleteTask(year, numeralMonth, day, index);
        //     });

        //     taskItem.appendChild(deleteButton);
        //     taskDiv.appendChild(taskItem);
        // });

        savedTasks.forEach((taskObj, index) => {
            console.log("Task Object:", taskObj); // Debugging the task object
        
            // Validate the task object
            const taskDescription = taskObj.task || "No Task Name";
            const startTime = taskObj.startTime ? convertTo12Hour(taskObj.startTime) : "No Start Time";
            const endTime = taskObj.endTime ? convertTo12Hour(taskObj.endTime) : "No End Time";
        
            // Create the task item
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.textContent = `${taskDescription}: ${startTime} - ${endTime}`;
        
            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-task-btn');
            deleteButton.addEventListener('click', function (e) {
                e.stopPropagation();
                deleteTask(year, numeralMonth, day, index);
            });
        
            // Append the delete button to the task item
            taskItem.appendChild(deleteButton);
        
            // Append the task item to the task container
            taskDiv.appendChild(taskItem);
        });
        

        dayLi.appendChild(taskDiv);

        const assignmentsForDay = assignments.filter(assignment => {
            const dueDate = new Date(assignment.due_at);
            return (
                dueDate.getFullYear() === year &&
                dueDate.getMonth() === numeralMonth &&
                dueDate.getDate() === day
            );
        });

        if (assignmentsForDay.length > 0) {
            assignmentsForDay.forEach(assignment => {
                const assignmentItem = document.createElement('div');
                assignmentItem.classList.add('assignment-item');
                const link = parseAssignmentLink(assignment.description);

                if (link) {
                    const assignmentLink = document.createElement('a');
                    assignmentLink.href = link;
                    assignmentLink.target = '_blank';
                    assignmentLink.textContent = assignment.name;
                    assignmentItem.appendChild(assignmentLink);
                } else {
                    assignmentItem.textContent = assignment.name;
                }

                dayContentDiv.appendChild(assignmentItem);
            });
        }

        daysContainer.appendChild(dayLi);
    }
}

/**
 * Opens the task modal for adding a new task on a specific date
 * @param {number} day - Day of the month
 * @param {number} month - Month index (0-11)
 * @param {number} year - Full year
 */
function openTaskModal(day, month, year) {
    currentDay = `${year}-${month}-${day}`;
    document.getElementById('selectedDate').value = currentDay; // Store the selected date
    document.getElementById('taskForm').reset(); // Clear previous task form
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    taskModal.show();
}

/**
 * Extracts assignment URL from description text
 * @param {string} description - Assignment description text
 * @returns {string|null} - Extracted URL or null if not found
 */
function parseAssignmentLink(description) {
    const linkMatch = description.match(/https:\/\/www\.cs\.odu\.edu\/[^"]+/);
    return linkMatch ? linkMatch[0] : null;
}

/**
 * Saves a new task to local storage
 */
// function saveTask() {
//     const task = document.getElementById('taskInput').value;
//     const time = document.getElementById('taskTime').value;
//     const selectedDate = document.getElementById('selectedDate').value;

//     if (!task || !time) {
//         alert("Both task and time are required.");
//         return;
//     }

//     // Retrieve existing tasks from localStorage
//     const tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
//     tasks.push({ task, time });
//     const sortedTasks = sortTasksByTime(tasks);

//     localStorage.setItem(selectedDate, JSON.stringify(sortedTasks));

//     const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
//     taskModal.hide();
//     fetchAssignmentsAndDisplay(); // Refresh the calendar to show the added task
// }

function saveTask() {
    const task = document.getElementById('taskInput').value;
    const startTime = document.getElementById('taskStartTime').value;
    const endTime = document.getElementById('taskEndTime').value;
    const selectedDate = document.getElementById('selectedDate').value;

    if (!task || !startTime || !endTime) {
        alert("Task, start time, and end time are required.");
        return;
    }

    if (startTime >= endTime) {
        alert("Start time must be before end time.");
        return;
    }

    // Retrieve existing tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
    tasks.push({ task, startTime, endTime });
    const sortedTasks = sortTasksByTime(tasks);

    localStorage.setItem(selectedDate, JSON.stringify(sortedTasks));

    const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    taskModal.hide();
    fetchAssignmentsAndDisplay(); // Refresh the calendar to show the added task
}


/**
 * Deletes a task from local storage
 * @param {number} year - Full year
 * @param {number} month - Month index (0-11)
 * @param {number} day - Day of the month
 * @param {number} taskIndex - Index of task to delete
 */
function deleteTask(year, month, day, taskIndex) {
    const dateKey = `${year}-${month}-${day}`;
    const tasks = JSON.parse(localStorage.getItem(dateKey)) || [];
    tasks.splice(taskIndex, 1); // Remove the task at the given index

    localStorage.setItem(dateKey, JSON.stringify(tasks));

    fetchAssignmentsAndDisplay();
}

/**
 * Sorts tasks by time in ascending order
 * @param {Array} tasks - Array of task objects with time property
 * @returns {Array} - Sorted array of tasks
 */
// function sortTasksByTime(tasks) {
//     return tasks.sort((a, b) => convertTo24Hour(a.time).localeCompare(convertTo24Hour(b.time)));
// }

function sortTasksByTime(tasks) {
    return tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
}


/**
 * Converts 24-hour time format to 12-hour format
 * @param {string} time - Time in 24-hour format (HH:MM)
 * @returns {string} - Time in 12-hour format with AM/PM
 */
function convertTo12Hour(time) {
    if (!time) {
        console.error("Invalid time passed to convertTo12Hour:", time);
        return "Invalid Time";
    }

    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}

/**
 * Converts 12-hour time format to 24-hour format
 * @param {string} time12h - Time in 12-hour format with AM/PM
 * @returns {string} - Time in 24-hour format (HH:MM)
 */
function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
}

/**
 * Updates calendar to display the previous month
 */
function getPreviousMonth() {
    const monthHeading = document.querySelector('.month h2');
    const [oldMonth, year] = monthHeading.textContent.split(" ");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const oldMonthIndex = months.indexOf(oldMonth);
    const previousMonthIndex = (oldMonthIndex - 1 + 12) % 12;
    const newYear = previousMonthIndex === 11 ? parseInt(year) - 1 : parseInt(year);

    const previousMonthDate = new Date(newYear, previousMonthIndex, 1);
    fetchAssignmentsAndDisplay(previousMonthDate);
}

/**
 * Updates calendar to display the next month
 */
function getNextMonth() {
    const monthHeading = document.querySelector('.month h2');
    const [oldMonth, year] = monthHeading.textContent.split(" ");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const oldMonthIndex = months.indexOf(oldMonth);
    const nextMonthIndex = (oldMonthIndex + 1) % 12;
    const newYear = nextMonthIndex === 0 ? parseInt(year) + 1 : parseInt(year);

    const nextMonthDate = new Date(newYear, nextMonthIndex, 1);
    fetchAssignmentsAndDisplay(nextMonthDate);
}
