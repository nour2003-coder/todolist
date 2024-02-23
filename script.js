const input = document.getElementById("input_text");
const taskList = document.getElementById("tasks");
const deleting = document.getElementById("trash");

deleting.addEventListener("click", (e) => {
    const listItems = taskList.children;
    const listArray = Array.from(listItems);
    listArray.forEach(element => {
        element.classList.add("delete");
    });
    const removeTaskListener = (event) => {
        if (event.target.tagName === "LI" && event.target.parentElement === taskList && event.target.classList.contains("delete")) {
            event.target.remove();
            listArray.forEach(element => {
                element.classList.remove("delete");
            });
            taskList.removeEventListener("click", removeTaskListener);
            save();
            load(); 
            return;
        }
    };
    taskList.addEventListener("click", removeTaskListener);
});

function add_task() {
    const inputValue = input.value;
    if (inputValue !== "") {
        const li = document.createElement("li");
        li.textContent = inputValue.trim();
        taskList.appendChild(li);
        save(); 
    }
    input.value = "";
}

const displayTasks = (tasks) => {
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

const load = () => {
    taskList.innerHTML = ""; 
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON !== null) {
        const tasks = JSON.parse(tasksJSON);
        displayTasks(tasks);
    }
}

window.addEventListener('load', load);

const save = () => {
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
}

const tick = (event) => {
    if (event.target.tagName === "LI" && event.target.parentElement === taskList && !event.target.classList.contains("delete")) {
        event.target.classList.toggle("checked");
        save();
    }
}

taskList.addEventListener("click", tick);
