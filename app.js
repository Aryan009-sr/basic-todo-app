document.addEventListener("DOMContentLoaded", loadTasks)
document.getElementById("addBtn").onclick = addTask;
//Add task with Enter.
document.getElementById("taskInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        console.log('e')
        e.preventDefault();
        addTask()
    }
})
//Add task
function addTask(){
    const input = document.getElementById("taskInput")
    const taskText = input.value.trim()
    if (taskText === ""){
        alert("Please enter valid text..");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed:false
    };
    saveTask(task);
    renderTask(task);

    input.value = "";
}

//save task to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load tasks from storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
}

//Render task To UI
function renderTask(task){
    const li = document.createElement("li");
    const span = document.createElement("span")
    span.textContent = task.text;
    if (task.completed) {
        span.classList.add("completed")
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    //complete task button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.onclick = () => toggleComplete(task.id, span);
    
    //Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = 'edit';
    editBtn.onclick = () => editTask(task.id, span);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => deleteTask(task.id, li);

    actions.appendChild(completeBtn)
    actions.appendChild(editBtn)
    actions.appendChild(deleteBtn)

    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById("taskList").appendChild(li);
}

//Marking task as completed
function toggleComplete(id, span){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === id);

    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    span.classList.toggle("completed");
}

//Edit task
function editTask(id, span){
    const updated = prompt("Update task:", span.textContent);
    if(!updated) return ;
    span.textContent = updated;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === id)
    task.text = updated;
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

//Delete Task
function deleteTask(id,li){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id === id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
}

//clear all
const clearTask = document.getElementById("clearAllTask")
clearTask.onclick = clearAll;
function clearAll(){
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
}