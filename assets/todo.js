const taskInput = document.querySelector('#task');
const taskList = document.querySelector('#taskfin');
const filter = document.querySelector('#filter');


taskInput.addEventListener('keypress', (event) => {
    if (event.which === 13) {
        if (taskInput.value === '') {
            alert('Input task')
        }

        const li = document.createElement('li');
        li.className = 'taskItem'
        //li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fas fa-trash"></i>'
        li.appendChild(link);
        li.appendChild(document.createTextNode(taskInput.value));

        taskList.appendChild(li);

        storeInStorage(taskInput.value);

        taskInput.value = '';
    }
})

function storeInStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', removeTask);

function removeTask(e) {
    //console.log(e.target);
    if (e.target.parentElement.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure")) {
            e.target.parentElement.parentElement.parentElement.remove();

            removeTaskFromLS((e.target.parentElement.parentElement.parentElement))
        }
    }
}

function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

filter.addEventListener('keyup', taskFilter);

function taskFilter(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.taskItem').forEach((task) => {
        const item = task.lastChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none';
        }
    })
}

$(document).ready(() => {
    console.log('Radi!!');

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'taskItem'
        //li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fas fa-trash"></i>'
        li.appendChild(link);
        li.appendChild(document.createTextNode(task));

        taskList.appendChild(li);

    })
})

//smisliti kako da kod bolje izgleda

