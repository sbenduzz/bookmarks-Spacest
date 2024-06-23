# bookmarks-Spacest

CRUD API's for a bookmark service for the Spacest.com job interview

## Application Features

The application provides a set of APIs for managing a collection of bookmarks, supporting Create, Read, Update, and Delete (CRUD) operations for bookmarks. Also, an additional Search operation is implemented, which includes paging functionality. Finally, the application interacts with a database. 

## Project Structure

The project is structured as follows:

```bash
bookmarks-spacest
├── db
│   └── Dockerfile
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── auth
│   │   ├── dto
│   │   │   ├── auth.dto.ts
│   │   │   └── index.ts
│   │   ├── guards
│   │   │   ├── auth.dto.ts
│   │   │   └── index.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── bookmark
│   │   ├── dto
│   │   │   ├── create-bookmark.dto.ts
│   │   │   ├── edit-bookmark.dto.ts
│   │   │   └── index.ts
│   │   ├── pipe
│   │   │   ├── intOrUndefined.pipe.ts
│   │   │   └── index.ts
│   │   ├── bookmark.controller.ts
│   │   ├── bookmark.module.ts
│   │   └── bookmark.service.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── README.md
├── docker-compose.yml
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```
- `db`: Contains the Dockerfile used to manage the database within a container;
- `prisma`: holds database migrations created with Prisma and defines the data model in the schema.prisma file;
- `src`: the main project folder:
  - `auth`: Module handling authentication;
  - `bookmark`:Module handling bookmarks;
  - `prisma`: Module integrating Prisma for database access;
  - `app.module.ts`: main application module.
  - `main.ts`: entry point for the application.

## Prerequisites

- *Docker* and *Docker Compose* installed on your system to run the database service.
- *Node.js* and *npm* installed on your system to run the application.
- *Git* installed on your system to clone the repository.

## Instructions for Running the Application

1. **Clone the repository from GitHub**:
   Open a terminal and clone the repository with the following command: 
    ```bash
    git clone https://github.com/sbenduzz/bookmarks-spacest
    ```
2. **Install the application dependencies**:
   From within a terminal run the following command:
    ```bash
    npm install
    ```
3. **Create the `.env` file**:
   The `.env` file contains environment variables needed for the project. Create a `.env` file in the root of your project. The necessary environment variables are:
   - `DATABASE_URL`: URL to connect to the MySQL server and the specific database;
   - `JWT_SECRET`: secret used to create and verify JWT tokens.
  Example `.env` file:
  ```
  DATABASE_URL="mysql://root:roomless@localhost:3306/bookmarks?schema=public"
  JWT_SECRET="YOUR_JWT_SECRET"
  ```
4. **Start the database service**:
    From within a terminal run the following command to start the MySQL container:
     ```bash
    docker-compose up -d
    ```
5. **Run the database migrations**:
   From within a terminal run the following command to apply the neccesary database migrations: 
    ```bash
    npx prisma migrate deploy
    ```
6. **Run the application**:
   From within a terminal run the following command to run the application: 
    ```bash
    npm start
    ```
    
# API Endpoints

## Authentication 

### Signup
- **Endpoint**: ```POST /auth/signup```
- **Description**: Register a new user.
- **Request Body** (as x-www-form-urlencoded):
  ```
  email:user@example.com
  password:your_password
  ```
- **Response**:
  - Body: User details.
  
### Signin
- **Endpoint**: ```POST /auth/signin```
- **Description**: Authenticate a user and obtain a JWT token.
- **Request Body** (as x-www-form-urlencoded):
  ```
  email:user@example.com
  password:your_password
  ```
- **Response**:
  - Body: JWT token.
  
## Bookmarks 
### Get Bookmarks
- **Endpoint**: ```GET /bookmarks```
- **Description**: Retrieve bookmarks for the authenticated user, possibly with pagination.
- **Query Parameters**
  -`page` (optional): Page number for pagination
  -`size` (optional): Number of items per page, for pagination
- **Response**:
  - Body: List of bookmarks.

### Get Bookmark by ID
- **Endpoint**: ```GET /bookmarks/:id```
- **Description**: Retrieve a specific bookmark, belonging to the authenticated user, by its ID.
- **Response**:
  - Body: Bookmark details.
 
### Create Bookmark
- **Endpoint**: ```POST /bookmark/create```
- **Description**: Create a new bookmark.
- **Request Body** (as x-www-form-urlencoded) example:
  ```
  title:Spacest.com
  url:https://spacest.com/
  description(optional):Spacest.com website
  ```
- **Response**:
  - Body: Created bookmark details.

### Update Bookmark
- **Endpoint**: ```PATCH  /bookmark/:id```
- **Description**: Update an existing bookmark.
- **Request Body** (as x-www-form-urlencoded) example:
  ```
  description(optional):Spacest.com very cool website
  ```
- **Response**:
  - Body: Updated bookmark details.
 
### Delete Bookmark
- **Endpoint**: ```DELETE   /bookmark/:id```
- **Description**: Delete a bookmark by its ID.
- **Response**:
  - Body: Deleted bookmark details.
 
