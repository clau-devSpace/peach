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

  let allList = document.querySelectorAll(".list");
  
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
    allTasks();

    }

   
});

//checking and unchecking the box while we click on the task

function handleStatus(e){
    const checkbox = e.querySelector("input");
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    allTasks();
    
}

//deleting task while we click on the delete icon

function deleteTask(e){
    e.parentElement.remove(); //getting parentElement and remove it
    allTasks();
}


//deleting all tasks while we click on the clear button

clearButton.addEventListener("click", ()=>{
  todoList.innerHTML = "";
  allTasks();  
});
