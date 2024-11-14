# Inventory Management for Books (in Progress)

## Project Description
A full-stack web application that allows users to add new books, filter existing books and export the data in JSON or CSV format

## How to Install and Run
- Navigate to the project folder
- Run `01 inventory_management`
- Install the necessary node modules on the terminal: `npm install`
- Type `http-server -p 8080` and `node server.js` on a separate terminal
- Open your browser and go to [http://127.0.0.1:8080](http://127.0.0.1:8080) or [http://10.0.0.239:8080](http://10.0.0.239:8080)

## How to Use the Project
- **Add Book**: Title, Author and ISBN should be filled to add a book
- **Filter Books**: Based on the criteria, it fetches the related books from the database (SQL LIKE)
- **Books List**: List the current books from the database
- **Export to CSV | Export to JSON**: Depending on which button is clicked by, it will export the current book data in that type and in the same folder

## Technology
- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express
- **Database**: RDBMS(MySQL)

## Future Enhancements
