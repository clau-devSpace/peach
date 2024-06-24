const inputField = document.querySelector(".input-field textarea"), 
todoList = document.querySelector(".todo-list"),
pendingTask = document.querySelector(".pending-num"),
clearButton = document. querySelector(".clear");
fecha = document.querySelector(".fecha");

const date = new Date();
fecha.innerHTML = date.toLocaleDateString('en', {weekday: 'long', month: 'short', day: 'numeric'} );


//we will call this function while adding, deleting and checking-unchecking the task

function allTasks(){
  let tasks =  document.querySelectorAll(".pending"); 
  pendingTask.textContent = tasks.length === 0 ? "no" : tasks.length;  
}

//add task while we put value in text area and press enter

inputField.addEventListener("keyup", (e)=> {
    let inputValue = inputField.value.trim();
    
    if(e.key === "Enter" && inputValue.length > 0){
        let li = `<li class="list pending" onclick="handleStatus(this)">
        <input type="checkbox" />
        <span class="task">${inputValue}</span>
        <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
    </li>`;

    todoList.insertAdjacentHTML("beforeend", li);
    inputField.value = "";

    saveTasks();
    allTasks();

    }


   
});

//checking and unchecking the box while we click on the task

function handleStatus(e){
    const checkbox = e.querySelector("input");
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    saveTasks();
    allTasks();
    
}

//deleting task while we click on the delete icon

function deleteTask(e){
    e.parentElement.remove(); //getting parentElement and remove it
    saveTasks();
    allTasks();
}


//deleting all tasks while we click on the clear button

clearButton.addEventListener("click", ()=>{
  todoList.innerHTML = "";
  allTasks();  
});

function loadTasks(){

  console.log("estamos tratando de cargar desde la memoria")
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    // const liAsElement = document.createElement('li');
    // liAsElement.className = list ${task.completed ? '' : 'pending'};
    // liAsElement.onclick = handleStatus(this);
    // liAsElement.appendChild( document.createElement('input'))
    
    const liAsString = `<li class="list ${task.completed ? '' : 'pending'}" onclick = "handleStatus(this)">
    <input type="checkbox" ${task.completed ? 'checked' : ''} />
    <span class="task">${task.text}</span>
    <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
    </li>`
    todoList.insertAdjacentHTML("beforeend", liAsString);
    
  }); 
  allTasks();

}

function saveTasks(){
  const tasks = [];
  const allList = document.querySelectorAll(".list");
  allList.forEach(li => {
    tasks.push({
      text: li.querySelector(".task").textContent,
      completed: !li.classList.contains("pending")
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks();
