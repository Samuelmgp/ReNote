const NoteObject = () => {
    title: ''
    content: ''
    date_created: 0
    backgroundColor: ''
    create_note: (title, content) => {
        const date = new Date()
        this.title = title
        this.content = content
        this.date_created = date.toString()
    }
    update_content: (content) => {
        this.content = content
    }
    update_title: (title) => {
        this.title = title
    }
}