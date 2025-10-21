const express = require("express");
const app = express();

//Question 1:
app.get("/", (req, res)=>{
    res.send("Hello, From Express Server.");
})

//Question 2:
const books = [
  { id: 1, title: "Lean In", author: "Sheryl Sandberg", year: 2013 },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { id: 3, title: "Shoe Dog", author: "Phil Knight", year: 2016 },
  { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 5, title: "Go Set a Watchman", author: "Harper Lee", year: 2015 },
];
app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const index = books.findIndex((book)=> book.id === Number(bookId))

    if(index === -1) {
        res.status(404).json({error: "Book not found"});
    } else {
        books.splice(index, 1)
        res.status(200).json({message: "Book deleted successfully."});
    }
})  

//Question 3:
app.get("/books", (req, res)=>{
    res.json(books)
})

//Question 4:
const todos = [
  { id: 1, title: "Water the plants", day: "Saturday" },
  { id: 2, title: "Go for a walk", day: "Sunday" },
];
app.delete("/todos/:id", (req, res)=>{
    const todoId = req.params.id;
    const index = todos.findIndex((todo)=> todo.id === Number(todoId));

    if(index === -1 || index >= todos.length){
        res.status(404).json({ error: "Todo does not exist." });
    } else {
        todos.splice(index, 1);
        res.status(200).json({message: "Todo deleted successfully."})
    }
})

//Question 5:
app.get("/todos", (req, res)=>{
    res.send(todos);
})

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`)
)