//setting up web storage
function saveData(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value)
    } else {
        alert('Your browser does not support localStorage API')
    }
}

function loadData(key) {
    if (localStorage) {
        if (key in localStorage) {
            return localStorage.getItem(key)
        }
    } else {
        alert('Your browser does not support localStorage API')
    }
}