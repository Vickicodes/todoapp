# Todo App
An app for making to-do lists

# Live Site
https://vickistodoapp.herokuapp.com/

# Motivation
Building this app was an exercise in learning PostgreSQL and Sequelize on the back end. 

# Features
- A database of users, to-do lists and to-do items
- User Authentication using Passport

# Technologies used
- NodeJS
- ExpressJS
- Passport
- Postgres
- jQuery
- EJS


# Known Issues to work on in the future
- No Mobile support
- Multiple database lookup for users
- Passport uses MemoryStore which is not designed for a production environment as it will leak memory

# Installation
- Clone repository: git clone https://github.com/Vickicodes/todoapp.git
- Install dependencies: npm i
- Assign environment variables: Session Secret
- Start Application: npm start