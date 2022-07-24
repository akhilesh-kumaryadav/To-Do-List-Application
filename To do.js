(function (){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const taskCounter = document.getElementById('task-counter')

    async function toDosAPI(){
        //Get request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function(response){
        //         return response.json();
        //     })
        //     .then(function (data){
        //         tasks = data.slice(0,5);
        //         renderList();
        //     })
        //     .catch(function (e){
        //         console.log('Error', e);
        //     })

        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0,0);
            renderList();
        } catch(e){
            console.log('Error', e);
        }

    }

    function showNotification(text) {
        alert(text);
    }

    function addTaskToDOM(task){
        const li = document.createElement('li');

        li.innerHTML = `
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                <p>${task.title}</p>
                <img src="trash-can-solid.svg" id="${task.id}" class="delete-icon">
            
        `;

        tasksList.append(li);
    }

    function renderList(){
        tasksList.innerHTML = '';
        
        for(var i = 0 ; i < tasks.length ; i++){
            addTaskToDOM(tasks[i]);
        }

        taskCounter.innerHTML = tasks.length;
    }

    function markTaskAsComplete(taskId){
        const task = tasks.filter(function(task) {
            return task.id == taskId;
        })

        if(task.length > 0){
            const currentTask = task[0];

            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification("Task toggle successfully");
            return;
        }

        showNotification("Toggle could not be completed");
    }

    function deleteTask(taskId){
        const newTasks = tasks.filter(function(task){
            return task.id != taskId;
        })

        tasks = newTasks;
        renderList();
        showNotification('Task Deleted Successfully');  
    }

    function addTask(task){
        if(task){
            tasks.push(task);
            renderList();
            showNotification("Task added successfully");
            return;
        }

        showNotification("Task cannot be added");
    }

    function handleInputKeypress(e){
        if(e.key == 'Enter'){
            const text = e.target.value;

            if(!text){
                showNotification("Task text cannot be empty");
                return;
            }

            const task = {
                title : text,
                id : Date.now().toString(),
                completed : false,
            }

            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickListener(e){
        const tar = e.target;

        if(tar.className == 'delete-icon'){
            const taskId = tar.id;
            deleteTask(taskId);
            return;
        }
        else if(tar.className == 'custom-checkbox'){
            const taskId = tar.id;
            markTaskAsComplete(taskId);
            return;
        }
    }

    function startOurProject(){
        toDosAPI();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }

    startOurProject();

})();

