const calendar = document.getElementById('calendar');
const selectedDate = document.getElementById('selectedDate');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
let currentDay = '';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to convert 24-hour time to 12-hour format
function convertTo12Hour(time) {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours}:${minutes} ${ampm}`;
}

// Function to create the calendar with days of the month
function createCalendar(month, year) {
    calendar.innerHTML = ''; // Clear the calendar

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.innerText = day;
        calendar.appendChild(header);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty';
        calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = day;
        dayDiv.addEventListener('click', () => selectDay(day, month, year));
        calendar.appendChild(dayDiv);
    }
}

// Function to select a day and load tasks for that day
function selectDay(day, month, year) {
    const selected = new Date(year, month, day);
    currentDay = `${year}-${month + 1}-${day}`;
    selectedDate.innerText = selected.toDateString(); // Display the full date
    taskInput.style.display = 'block';
    loadTasksForDay(currentDay);

    document.querySelectorAll('.day').forEach(dayDiv => {
        dayDiv.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Function to add a new task
function addTask() {
    const task = document.getElementById('task').value;
    const time = document.getElementById('taskTime').value;

    if (!task || !time) {
        alert('Please enter both task and time');
        return;
    }

    // Save task to local storage
    const tasks = JSON.parse(localStorage.getItem(currentDay)) || [];
    tasks.push({ task, time });
    localStorage.setItem(currentDay, JSON.stringify(tasks));

    document.getElementById('task').value = '';
    document.getElementById('taskTime').value = '';
    loadTasksForDay(currentDay);
}

// Function to load tasks for the selected day, sorted by time (earliest first)
function loadTasksForDay(day) {
    tasksList.innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem(day)) || [];

    // Convert time to a number (e.g., "18:30" -> 1830) and sort in ascending order (earliest first)
    tasks.sort((a, b) => {
        const timeA = parseInt(a.time.replace(':', ''), 10); // Convert "18:30" to 1830
        const timeB = parseInt(b.time.replace(':', ''), 10); // Convert "09:45" to 945
        return timeA - timeB; // Sort in ascending order
    });

    // Display the tasks
    tasks.forEach(taskObj => {
        const taskItem = document.createElement('li');
        taskItem.innerText = `${taskObj.task} at ${convertTo12Hour(taskObj.time)}`;
        tasksList.appendChild(taskItem);
    });
}

window.onload = () => {
    createCalendar(currentMonth, currentYear);
};
