// Toggle Themes

let toggleBtn = document.querySelector('.toggletheme')
let themeImg = document.querySelector('.toggletheme img')

let theme = localStorage.getItem('theme')

if (theme === 'dark') {
  document.body.classList.add('darktheme')
  themeImg.dataset.theme = 'dark'
  themeImg.src = 'images/sun.png'
}

function toggleTheme() {
  document.body.classList.toggle('darktheme')
  if (themeImg.dataset.theme === 'light') {
    themeImg.dataset.theme = 'dark'
    themeImg.src = 'images/sun.png'
    localStorage.theme = 'dark'
  }else{
    themeImg.dataset.theme = 'light'
    themeImg.src = 'images/moon.png'
    localStorage.theme = 'light'
  }
}

toggleBtn.addEventListener('click', toggleTheme)

// To Do List

let taskInput = document.getElementById('addtask')
let addBtn = document.querySelector('.add')
let box = document.querySelectorAll('.box')[0]
let boxContent = box.querySelector('.box-content')
let allTasks = JSON.parse(localStorage.tasks) || []

// Add Task to the box
addBtn.addEventListener('click', () => {
  let taskValue = taskInput.value
  if (taskValue === '') {
    console.log('enter the value');
  }else{
    boxContent.innerHTML += `
    <div class='task' draggable="true">
    <p class='text'>${taskValue}</p>
    <button class='delete' >delete</button>
    </div>
    `
    taskInput.value = ''
    allTasks.push({
      id: Date.now(),
      task: taskValue,
      status:null
    })
    taskInput.focus()
    localStorage.tasks = JSON.stringify(allTasks)
  }

  drageTask()
  deleteTask()
})

// Drag Task

function drageTask(){
  let tasks = document.querySelectorAll('.task')
  let boxes = document.querySelectorAll('.box')
  let currentDrag = null
  tasks.forEach(task => {
    // Start Draging
    task.addEventListener('dragstart', () =>{
      task.style.backgroundColor = '#c1c1c1'
      currentDrag = task
    })
    
    // End Draging
    task.addEventListener('dragend', () =>{
      task.style.backgroundColor = '#fff'
      currentDrag = null
    })

    boxes.forEach(box => {
      // Drag Over
      box.addEventListener('dragover', (e) =>{
        e.preventDefault()
        box.style.backgroundColor = 'green'
        
      })
      
      // Drag Leave
      box.addEventListener('dragleave', () =>{
        box.style.backgroundColor = 'var(--box-bg-color)'
      })

      // Drop
      box.addEventListener('drop', () =>{
        box.appendChild(currentDrag)
        box.style.backgroundColor = 'var(--box-bg-color)'
      })

    })
  })
}


function deleteTask(){
  let deleteBtn = document.querySelectorAll('.delete')

  deleteBtn.forEach(btn =>{
    btn.addEventListener('click', ()=> {
      btn.parentElement.remove()
    })
  })
  
}


document.addEventListener('keyup', (e)=>{
  if (e.key === 'Enter') {
    addBtn.click()
  }
  
})

