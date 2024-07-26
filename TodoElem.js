export class TodoElem {
    constructor(content, classNames, id = Date.now(), isCompleted = false) {
        this.content = content,
        this.classNames = classNames,
        this.id = id,
        this.isCompleted = isCompleted;
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    getDateOfTodoElem() {
        return (new Date(this.id)).toLocaleString();
    }

    getIsCompletedContent() {
        return this.isCompleted ? 'Is completed' : 'Complete';
    }

    render(parentElement) {
        const div = document.createElement('div');
        this.classNames.map(className => div.classList.add(className));
        div.setAttribute('id', this.id);

        const buttonContent = this.getIsCompletedContent();

        const html = `
            <p class="todo-content">${this.content}</p>
            <p> Date: <span>${this.getDateOfTodoElem()}</span></p>
            <button class="todo-isCompleted">${buttonContent}</button>
            <button class="todo-delete">Delete</button>
        `;

        div.innerHTML = html;

        console.log(parentElement);
        parentElement.prepend(div);
    }
}