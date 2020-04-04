const input = document.getElementById('task-input')
const totalTasks = document.getElementById('total')
const completedTask = document.getElementById('completed')
const modal = document.getElementById('modal')
const maxRecentlyDeleted = 4;

loadData('totalTasks') || saveData('totalTasks', 0)
loadData('completedTasks') || saveData('completedTasks', 0)
loadData('toDoTheme') || saveData('toDoTheme', "light")

totalTasks.innerHTML = loadData('totalTasks')
completedTask.innerHTML = loadData('completedTasks')

function updateTasks() {
    readTasks(taskStore, (tasks) => {
        let list = document.getElementById('task-list')
        let innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            innerHTML += `
            <li data-id:'${tasks[i].id}' onclick='deleteTaskOnClick(this)'>${tasks[i].title}</li>`;
        }
        list.innerHTML = innerHTML
    })


    readTasks(completedTaskStore, (tasks) => {
        console.log('hello')
        let list = document.getElementById('completed-taskss-list')
        let innerHTML = "";
        tasks.reverse()
        for (let i = 0; i < Math.min(tasks.length, maxRecentlyDeleted); i++) {
            innerHTML += `<li class='invert'>${tasks[i].title}: <span>${tasks[i].completedDate}</span></li>`;
        }
        list.innerHTML = innerHTML
    })
}

function onLoad() {
    updateTasks()
}

function deleteTaskOnClick(elem) {
    let id = Number(elem.dataset.id)

    let task = readOneTask(taskStore, id, function(task) {
        let completedTask = new completedTasks(task.title)
        addTask(completedTaskStore, completedTask, function() {

            elem.classList.add('exit')

        })
    })

}

input.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        let task = new Task(input.value)
        input.value = ""
        if (task.title.length === 0) { return }

        addTask(taskStore, task, function() {
            let amountOfTasks = Number(loadData('totalTasks')) + 1
            saveData('totalTasks', amountOfTasks)
            totalTasks.innerHTML = loadData('totalTasks')
            updateTasks()
        })
    }
})