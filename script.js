import { TodoApp } from "./TodoApp.js";

const todoAddButton = document.getElementById('create-task-button');
const todoInput = document.getElementById('create-task-input');
const todoFilter = document.getElementById('todo-filter');
const todoSort = document.getElementById('todo-sort');
const todoUl = document.getElementById('todo-ul');

const todoElemClassNames = ['todo-elem', 'shadow-blue'];

const app = new TodoApp(todoUl, todoAddButton, todoInput, todoFilter, todoSort, todoElemClassNames);
app.init();

