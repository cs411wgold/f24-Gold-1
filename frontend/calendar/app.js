document.addEventListener("DOMContentLoaded", function() {
    setupDate();
    document.getElementById('saveTaskBtn').addEventListener('click', saveTask);
});

let currentDay = ''; // Used to track the selected day for adding tasks

// Function to set up the calendar for a specific date
function setupDate(date) {
    const monthHeading = document.querySelector('.month h2');
    const daysContainer = document.querySelector('.days');
    const currentDate = date ?? new Date();
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
        dayLi.textContent = day;
        dayLi.addEventListener('click', () => openTaskModal(day, numeralMonth, year));
        daysContainer.appendChild(dayLi);

        // Check if there are saved tasks for this day
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const savedTasks = JSON.parse(localStorage.getItem(`${year}-${numeralMonth}-${day}`)) || [];
        savedTasks.forEach(taskObj => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.textContent = `${taskObj.task} at ${convertTo12Hour(taskObj.time)}`;
            taskDiv.appendChild(taskItem);
        });
        dayLi.appendChild(taskDiv);
    }
}

// Function to open the modal when clicking on a date
function openTaskModal(day, month, year) {
    currentDay = `${year}-${month}-${day}`;
    document.getElementById('selectedDate').value = currentDay; // Store the selected date
    document.getElementById('taskForm').reset(); // Clear previous task form
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    taskModal.show();
}

// Function to save the task
function saveTask() {
    const task = document.getElementById('taskInput').value;
    const time = document.getElementById('taskTime').value;
    const selectedDate = document.getElementById('selectedDate').value;

    if (!task || !time) {
        alert("Both task and time are required.");
        return;
    }

    // Save task to local storage
    const tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
    tasks.push({ task, time });
    localStorage.setItem(selectedDate, JSON.stringify(tasks));

    // Close modal and refresh the calendar
    const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    taskModal.hide();
    setupDate(); // Refresh the calendar to show the added task
}

// Function to convert 24-hour time to 12-hour format
function convertTo12Hour(time) {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours}:${minutes} ${ampm}`;
}

// Function to get the previous month
function getPreviousMonth() {
    const monthHeading = document.querySelector('.month h2');
    const parts = monthHeading.textContent.split(" ");
    const oldMonth = parts[0];
    let year = parts[1];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let previousMonth = months[months.indexOf(oldMonth) - 1];

    if (oldMonth === "January") {
        previousMonth = 'December';
        year = (parseInt(year) - 1).toString();
    }

    const calendarDate = new Date(year, months.indexOf(previousMonth));
    setupDate(calendarDate);
}

// Function to get the next month
function getNextMonth() {
    const monthHeading = document.querySelector('.month h2');
    const parts = monthHeading.textContent.split(" ");
    const oldMonth = parts[0];
    let year = parts[1];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let nextMonth = months[months.indexOf(oldMonth) + 1];

    if (oldMonth === "December") {
        nextMonth = 'January';
        year = (parseInt(year) + 1).toString();
    }

    const calendarDate = new Date(year, months.indexOf(nextMonth));
    setupDate(calendarDate);
}
