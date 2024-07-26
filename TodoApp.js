import { TodoList } from "./TodoList.js";

export class TodoApp {
    constructor(todoUl, todoAddButton, todoInput, todoFilter, todoSort, todoElemClassNames) {
        this.todoUl = todoUl,
        this.todoAddButton = todoAddButton,
        this.todoInput = todoInput,
        this.todoFilter = todoFilter,
        this.todoSort = todoSort,
        this.todoElemClassNames = todoElemClassNames,
        this.todoList = new TodoList(todoUl)
    }

    filterOptions = {
        all: 'all',
        completed: true,
        notCompleted: false,
    }

    init() {
        this.todoList.render();
        console.log(this.todoList.nodeElement)

        //при нажатии на кнопку add появляется новое задание
        const todoApp = this;
        this.todoAddButton.addEventListener('click', this.handleSubmit.bind(this))

        //фильтрация списка по критерию
        this.todoFilter.addEventListener('change', function() {
            const value = this.value;
            todoApp.handleFilter(value);
        })

        //сортировка списка по критерию
        this.todoSort.addEventListener('change', function() {
            const value = this.value;
            todoApp.handleSort(value);
        })

        //при нажатии на кнопку complete задание отмечается как выполненное
        this.todoUl.addEventListener('click', function(e) {
            const button = e.target;
            if (button.classList.contains('todo-isCompleted')) {
                todoApp.handleCompleted(button);
            }
        })

        //при нажатии на кнопку delete, задание удаляется
        this.todoUl.addEventListener('click', function(e) {
            const button = e.target;
            if (button.classList.contains('todo-delete')) {
                todoApp.handleDelete(button);
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const content = this.todoInput.value;
        if (content != '') {
            this.todoList.addElem(content, this.todoElemClassNames);
            this.todoInput.value = '';
        }
    }

    handleCompleted(button) {
        const id = button.parentElement.getAttribute('id');
        button.innerHTML = this.todoList.toggleToDoElemCompleted(id);
    }

    handleDelete(button) {
        const taskNode = button.parentElement;
        // Удаляем элемент из DOM
        taskNode.remove();
        //Удаляем элемент из массиваы
        this.todoList.removeTodoElem(taskNode.id); 
    }

    handleSort(option) { 
        let sortedList;
        if (option == 'content') {
            sortedList = this.todoList.sortByContent();
        }  else if (option == 'date') {
            sortedList = this.todoList.sortByDate();
        }
        this.todoList.render(sortedList);
    }

    handleFilter(option) {
        const val = this.filterOptions[option];
        const filteredList = this.todoList.filter(val);
        this.todoList.render(filteredList);
    }
}