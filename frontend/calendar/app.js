const calendar = document.getElementById('calendar');
const selectedDate = document.getElementById('selectedDate');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
let currentDay = '';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function createCalendar(month, year) {
    // Clear the calendar before adding new days
    calendar.innerHTML = '';

    const firstDay = new Date(year, month).getDay(); // Get the first day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month

    // Create day headers (Sunday to Saturday)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.innerText = day;
        calendar.appendChild(header);
    });

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty';
        calendar.appendChild(emptyDiv);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = day;

        dayDiv.addEventListener('click', () => selectDay(day, month, year));
        calendar.appendChild(dayDiv);
    }
}

function selectDay(day, month, year) {
    const selected = new Date(year, month, day);
    currentDay = `${year}-${month + 1}-${day}`;
    selectedDate.innerText = selected.toDateString(); // Display the full date
    taskInput.style.display = 'block';
    loadTasksForDay(currentDay);

    // Highlight selected day
    document.querySelectorAll('.day').forEach(dayDiv => {
        dayDiv.classList.remove('active');
    });
    event.target.classList.add('active');
}

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

function loadTasksForDay(day) {
    tasksList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem(day)) || [];
    tasks.forEach(taskObj => {
        const taskItem = document.createElement('li');
        taskItem.innerText = `${taskObj.task} at ${taskObj.time}`;
        tasksList.appendChild(taskItem);
    });
}

window.onload = () => {
    createCalendar(currentMonth, currentYear);
};
