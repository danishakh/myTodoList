# myTodoList
A Simple ToDo List using MERN stack, built using MaterialUI. 
The client-side of this app was bootstrapped with `create-react-app`


## Quick Start

To quickly spin up a local instance of this project, please follow the following steps:

Change the mongo URL to either your localhost MongoDB database instance or to your own mLab Mongo instance by changing the URL/credentials like in the following piece of code in `server.js`:

```javascript
    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost/<YOUR_TODO_DB>",
        { useNewUrlParser: true }
    );
```

Install all packages and run the application

`# Install dependencies for server`

`npm install`

`# Install dependencies for client`

`npm run client-install`

`# Run the client & server with concurrently`

`npm run dev`


## Live Website
https://react-todo-app10.herokuapp.com/

