import { TodoElem } from "./TodoElem.js";

export class TodoList {
    constructor(nodeElement) {
        const todoElems = JSON.parse(localStorage.getItem('todoElems')) || [];
        this.todoElems = todoElems.map(({content, classNames, id, isCompleted}) => new TodoElem(content, classNames, id, isCompleted));
        this.nodeElement = nodeElement;
    }

    //добавить новый элемент в список
    addElem(content, classNames) {
        const elem = new TodoElem(content, classNames);
        this.todoElems.push(elem);
        //отрендерить новый элемент
        elem.render(this.nodeElement);
        this.saveToLocalStorage();
    }

    //сохранить в local storage
    saveToLocalStorage() {
        localStorage.setItem('todoElems', JSON.stringify(this.todoElems));
    }

    // удалить элемент
    removeTodoElem(id) {
        this.todoElems = this.todoElems.filter(el => el.id != id);
        this.saveToLocalStorage();
    }

    //изменить состояние isCompleted (true/false) элемента
    toggleToDoElemCompleted(id) {
        //достаем ссылку на нужный элемент
        const elem = this.todoElems.find(el => el.id == id);
        //меняем свойство isCompleted
        if (elem) elem.toggleCompleted();
        this.saveToLocalStorage();
        // возвращаем состояние элемента isCompleted
        return elem.getIsCompletedContent();
    }

    //фильтрация элементов
    filter(option) {
        if (option === 'all') {
            return this.todoElems;
        } 
        return this.todoElems.filter(el => el.isCompleted == option);
    }

    //сортировка по контенту
    sortByContent() {
        return this.todoElems.sort((a, b) => b.content.localeCompare(a.content));
    }

    //сортировка по дате
    sortByDate() {
        return this.todoElems.sort((a, b) => a.id - b.id);
    }

    //отрендерить весь список
    render(list = this.todoElems) {
        this.nodeElement.innerHTML = '';
        if (list.length != 0) {
            list.map(el => el.render(this.nodeElement));
            this.saveToLocalStorage();
        }
    }
}