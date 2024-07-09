export class TodoElem {
    constructor(content) {
        this.content = content,
        this.id = Date.now(),
        this.isCompleted = false
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    getDateOfTodoElem() {
        return (new Date(this.id)).toLocaleString();
    }
}