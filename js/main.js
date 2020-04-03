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
    console.log('Update Task')
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