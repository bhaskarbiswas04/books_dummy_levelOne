const express = require("express");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const BookModel = require("./model/books.model");

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// const books = [
//   { id: 1, title: "Lean In", author: "Sheryl Sandberg", year: 2013 },
//   { id: 2, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
//   { id: 3, title: "Shoe Dog", author: "Phil Knight", year: 2016 },
//   { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
//   { id: 5, title: "Go Set a Watchman", author: "Harper Lee", year: 2015 },
// ];

// async function seedInitialBooks() {
//   try {
//     const count = await BookModel.countDocuments();
//     if (count === 0) {
//       await BookModel.insertMany(books);
//       console.log("Initial books seeded successfully!");
//     } else {
//       console.log("Books already exist in the database.");
//     }
//   } catch (error) {
//     console.error("Error seeding initial books:", error);
//   }
// }
// seedInitialBooks();

app.get("/books", async (req, res) => {
  try {
    const books = await BookModel.find();
    if(books) {
        res.json(books)
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

async function readBookByTitle (bookTitle) {
    try {
        const bookData = await BookModel.findOne({title: bookTitle});
        return bookData;    
    } catch (error) {
        throw error
    }
}
app.get("/books/:bTitle", async (req, res)=> {
    try {
        const book = await readBookByTitle(req.params.bTitle);
        if(book) {
            res.json(book)
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});

async function readBooksByAuthor(bookAuthor) {
  try {
    const books = await BookModel.find({ author: bookAuthor });
    return books;
  } catch (error) {
    throw error;
  }
}
app.get("/books/author/:bAuthor", async (req, res)=>{
    try {
        const books = await readBooksByAuthor(req.params.bAuthor);
        if(books) {
            res.status(200).json({message: "Books fetched successfully."})
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
})


const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


