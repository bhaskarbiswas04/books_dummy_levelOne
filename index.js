const express = require("express");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const BookModel = require("./model/books.model");

const PORT = 3000;

async function startServer() {
  await initializeDatabase();
  // await seedInitialBooks();

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

startServer();


const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: "1960",
    genre: "Fiction, Classic, Coming-of-Age",
    language: "English",
    country: "United States",
    rating: "4.8",
    summary:
      "A powerful novel set in the racially charged American South, following young Scout Finch as her father, Atticus, defends a black man unjustly accused of a crime.",
    coverImageUrl: "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg",
  },
  {
    title: "Lean In",
    author: "Sheryl Sandberg",
    publishedYear: "2013",
    genre: "Non-fiction, Business, Self-help",
    language: "English",
    country: "United States",
    rating: "4.2",
    summary:
      "A call to action for women to pursue their ambitions and for society to create a more equal world, written by Facebook COO Sheryl Sandberg.",
    coverImageUrl: "https://m.media-amazon.com/images/I/71nK4JzW0rL.jpg",
  },
  {
    title: "Go Set a Watchman",
    author: "Harper Lee",
    publishedYear: "2015",
    genre: "Fiction, Drama",
    language: "English",
    country: "United States",
    rating: "3.9",
    summary:
      "Set two decades after 'To Kill a Mockingbird', the story follows Scout Finch as she returns to Maycomb, Alabama, and struggles with her father’s changing views.",
    coverImageUrl: "https://m.media-amazon.com/images/I/81N7lm4YbKL.jpg",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    publishedYear: "2016",
    genre: "Autobiography, Business, Memoir",
    language: "English",
    country: "United States",
    rating: "4.7",
    summary:
      "The candid memoir of Nike’s co-founder Phil Knight, detailing the early struggles, risks, and triumphs that shaped one of the world’s most iconic brands.",
    coverImageUrl: "https://m.media-amazon.com/images/I/71kxa1-0zfL.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    publishedYear: "1988",
    genre: "Fiction, Adventure, Philosophy",
    language: "Portuguese (original), English (translated)",
    country: "Brazil",
    rating: "4.6",
    summary:
      "A spiritual tale about a young shepherd named Santiago who embarks on a journey to discover his personal legend and the meaning of true treasure.",
    coverImageUrl: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
  },
];

async function seedInitialBooks() {
  try {
    for (const book of books) {
      const newBook = new BookModel({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genre: book.genre,
        language: book.language,
        country: book.country,
        rating: book.rating,
        summary: book.summary,
        coverImageUrl: book.coverImageUrl,
      });

      await newBook.save();
      console.log(`📘 Saved: ${book.title}`);
    }

    console.log("🎉 All books inserted successfully!");
  } catch (error) {
    console.error("❌ Error seeding initial books:", error);
  }
}

// express routes...
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
        if(books.length > 0) {
            res.json(books)
            res.status(200).json({message: "Books fetched successfully."})
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
})

//route to add a new book.
app.post("/books", async (req, res)=> {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add book" });
  }
})

//route to delete book.
app.delete("/books/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const deletedBook = await BookModel.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      deletedMovie,
    });
  } catch (error) {
    console.error("Error while deleting book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


