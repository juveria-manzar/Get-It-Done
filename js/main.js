const input = document.getElementById("task-input");
const totalTasks = document.getElementById("total");
const completedTasks = document.getElementById("completed");
const modal = document.getElementById("modal");
const maxRecentlyDeleted = 4;


loadData("TotalTasks") || saveData("TotalTasks", 0);
loadData("CompletedTasks") || saveData("CompletedTasks", 0);
loadData("ToDoTheme") || saveData("ToDoTheme", "light");

totalTasks.innerHTML = loadData("TotalTasks");
completedTasks.innerHTML = loadData("CompletedTasks");

input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        let task = new Task(input.value);
        input.value = "";
        if (task.title.length === 0) { return }
        addTask(taskStore, task, function() {
            let amountOfTasks = Number(loadData("TotalTasks")) + 1;
            saveData("TotalTasks", amountOfTasks);
            totalTasks.innerHTML = loadData("TotalTasks");
            updateTasks();
        });
    }
});


function updateTasks() {
    readTasks(taskStore, function(tasks) {
        let list = document.getElementById("task-list");
        let innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            innerHTML += `
                <li data-id='${tasks[i].id}' onclick='deleteTaskOnClick(this)'>
                    ${tasks[i].title}
                </li>
            `;
        }
        list.innerHTML = innerHTML;
    });


    readTasks(completedTaskStore, function(tasks) {
        let list = document.getElementById("completed-tasks-list");
        let innerHTML = "";
        tasks.reverse();
        for (let i = 0; i < Math.min(tasks.length, maxRecentlyDeleted); i++) {
            innerHTML += `<li class='invert'>${tasks[i].title}: <span>${tasks[i].completedDate}</span></li>`;
        }
        list.innerHTML = innerHTML;
    });
}


function onLoad() {
    updateTasks();
    // updateTheme(loadData("ToDoTheme"));
    // document.body.style.display = "flex";
}


function deleteTaskOnClick(elem) {
    let id = Number(elem.dataset.id);
    console.log(elem)
    let task = readOneTask(taskStore, id, function(task) {

        let completedTask = new CompletedTasks(task.title);
        addTask(completedTaskStore, completedTask, function() {
            console.log
            elem.classList.add("exit");

            elem.addEventListener("animationend", function() {
                deleteTask(taskStore, id, function() {
                    let amountOfTasks = Number(loadData("TotalTasks")) - 1;
                    saveData("TotalTasks", amountOfTasks);
                    totalTasks.innerHTML = loadData("TotalTasks");

                    let amountOfCompleted = Number(loadData("CompletedTasks")) + 1;
                    saveData("CompletedTasks", amountOfCompleted);
                    completedTasks.innerHTML = loadData("CompletedTasks");
                    updateTasks();
                });
            });
        });
    });




}