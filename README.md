# ThoughtLane

ThoughtLane is a blogging application that allows users to post, update, delete blogs, view other blogs, comment on each other's blogs, like them, and view other user profiles with their posted blogs. Built using Next.js, Node.js, Express.js, and MongoDB, ThoughtLane offers a comprehensive blogging experience.

## Features

- **User Authentication**: Register and login users securely.
- **Blog Management**: Create, update, delete, view blogs.
- **Commenting**: Add comments to blogs.
- **Liking Posts**: Like and unlike blogs.
- **Profile Viewing**: View and manage user profiles.

## Installation

To get started with ThoughtLane, follow these steps:

1. **Clone the Repository**

   `git clone https://github.com/IshaanVadhan/thought-lane.git`

2. **Setup the Client**

   Navigate to the `thought-lane-client` directory:

   ```
   cd thought-lane-client
   ```

   Create a `.env` file and add the following key:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

   Install the dependencies:

   ```
   npm install
   ```

3. **Setup the Server**

   Navigate to the `thought-lane-server` directory:

   ```
   cd thought-lane-server
   ```

   Create a `.env` file and add the following keys:

   ```
   MONGO_URI=mongodb://localhost:27017/thoughtlane
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   Install the dependencies:

   ```
   npm install
   ```

## Running the Application

1. **Run the Client**

   Navigate to the `thought-lane-client` directory and start the development server:

   ```
   npm run dev
   ```

2. **Run the Server**

   Navigate to the `thought-lane-server` directory and start the server:

   ```
   node app.js
   ```

   Alternatively, use `nodemon` for automatic restarts:

   ```
   nodemon app.js
   ```

## API Endpoints

### Authentication

- **POST /api/register** - Register a new user.
- **POST /api/login** - Log in an existing user.
- **GET /api/me** - Retrieve the profile of the logged-in user.

### Tasks

- **POST /api/posts** - Create a new blog post.
- **GET /api/posts** - Retrieve all blog posts.
- **GET /api/posts/:id** - Retrieve a specific blog post by ID.
- **GET /api/user/:userId/posts** - Retrieve all blog posts by a specific user.
- **PUT /api/posts/:id** - Update a blog post.
- **DELETE /api/posts/:id** - Delete a blog post.
- **PUT /api/posts/:id/like** - Like or unlike a blog post.
- **POST /api/posts/:id/comments** - Add a comment to a blog post.
- **GET /api/posts/:id/comments** - Retrieve comments for a blog post.

## Contact

For any questions or issues, please contact [ishaanvadhan2001@gmail.com](mailto:ishaanvadhan2001@gmail.com).
