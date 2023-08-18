const inputField = document.querySelector('input')
const form = document.querySelector('form')
const todoList = document.getElementById('todo-list')
const itemsLeft = document.getElementById('items-left')
const todoDiv = document.querySelector('.todo-div')
const tabs = document.querySelectorAll('.tab')
const root = document.documentElement
const themeSwitchBtn = document.getElementById('theme-switcher')
const iconSun = document.getElementById('icon-sun')
const iconMoon = document.getElementById('icon-moon')
const bgDark = document.querySelector('.bg-dark')
const bgLight = document.querySelector('.bg-light')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const newTodo = document.createElement('li')
  newTodo.classList.add(
    'flex',
    'items-center',
    'gap-3',
    'px-5',
    'py-3',
    'cursor-pointer'
  )
  newTodo.setAttribute('draggable', 'true')
  newTodo.innerHTML = `
    <button class="check-btn unchecked">
      <img class="hidden w-full p-1.5" src="../images/icon-check.svg" alt="" />
    </button>
    <p>${inputField.value}</p>
    <button class="hidden h-6 ml-auto w-7 delete-btn">
        <img src="../images/icon-cross.svg" alt="" />
    </button>
  `

  todoList.appendChild(newTodo)
  todoList.innerHTML += '<hr class="border border-clr-bg-border" />'
  inputField.value = ''
  itemsLeft.textContent++
})

todoList.addEventListener('click', (e) => {
  const target = e.target.closest('.check-btn')

  if (target) {
    const li = target.closest('li')
    li.classList.toggle('completed')

    target.classList.toggle('unchecked')
    target.classList.toggle('checked')

    let todo = target.nextElementSibling
    todo.classList.toggle('line-through')
    todo.classList.toggle('text-clr-text-secondary')
    todo.classList.toggle('decoration-clr-line-through')

    itemsLeft.textContent =
      todoList.querySelectorAll('li:not(.completed)').length
  }

  if (e.target.parentElement.classList.contains('delete-btn')) {
    const li = e.target.closest('li')
    const hr = li.nextElementSibling

    hr.remove()
    li.remove()
    itemsLeft.textContent =
      todoList.querySelectorAll('li:not(.completed)').length
  }
})

todoDiv.addEventListener('click', (e) => {
  if (e.target.id === 'clear-btn') {
    const completedTodos = todoList.querySelectorAll('li.completed')
    completedTodos.forEach((todo) => {
      todo.nextElementSibling.remove()
      todo.remove()
    })
  }
})

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((tab) => {
      tab.classList.remove('text-clr-accent')
    })

    tab.classList.add('text-clr-accent')

    const tabClass = tab.classList[3]
    const todos = todoList.querySelectorAll('li')

    todos.forEach((todo) => {
      if (tabClass === 'active') {
        todo.classList.toggle('hidden', todo.classList.contains('completed'))
        todo.nextElementSibling.classList.toggle(
          'hidden',
          todo.classList.contains('completed')
        )
      } else if (tabClass === 'completed') {
        todo.classList.toggle('hidden', !todo.classList.contains('completed'))
        todo.nextElementSibling.classList.toggle(
          'hidden',
          !todo.classList.contains('completed')
        )
      } else {
        todo.classList.remove('hidden')
        todo.nextElementSibling.classList.remove('hidden')
      }
    })
  })
})

themeSwitchBtn.addEventListener('click', () => {
  root.classList.toggle('theme-dark')
  root.classList.toggle('theme-light')

  iconSun.classList.toggle('hidden')
  iconMoon.classList.toggle('hidden')

  bgDark.classList.toggle('hidden')
  bgLight.classList.toggle('hidden')
})

let draggingElement = null
let draggingHr = null

todoList.addEventListener('dragstart', (event) => {
  draggingElement = event.target.closest('li')
  draggingHr = draggingElement.nextElementSibling
})

todoList.addEventListener('dragover', (event) => {
  event.preventDefault()
  const targetElement = event.target
  const isBefore = getRelativePosition(event.clientY, targetElement) < 0
  const siblingElement = isBefore
    ? targetElement.previousElementSibling
    : targetElement
  todoList.insertBefore(draggingElement, siblingElement.nextSibling)
  todoList.insertBefore(draggingHr, siblingElement.nextSibling)
})

todoList.addEventListener('dragend', () => {
  draggingElement = null
  draggingHr = null
})

function getRelativePosition(y, element) {
  const rect = element.getBoundingClientRect()
  return y - rect.top - rect.height / 2
}
