# Musicart (E-commerce Website)

Welcome to Musicart, an e-commerce platform where music enthusiasts can explore and purchase a wide range of musical products. 
Feel free to check out our live deployment at [Musicart on Render](https://musicart.onrender.com).

## User API Endpoints

### Register User

- **Method**: `POST`
- **Endpoint**: `/api/user/register`
- **Description**: Allows users to register and create an account.

### Login User

- **Method**: `POST`
- **Endpoint**: `/api/user/login`
- **Description**: Allows registered users to log in and access their accounts.

## Product API Endpoints

### Add Product

- **Method**: `POST`
- **Endpoint**: `/api/product/add`
- **Authorization**: Admin
- **Description**: Allows authorized administrators to add new products to the platform.

### Get All Products

- **Method**: `GET`
- **Endpoint**: `/api/product/`
- **Description**: Retrieves a list of all available products in the Musicart catalog.

### Get Product by ID

- **Method**: `GET`
- **Endpoint**: `/api/product/:productId`
- **Description**: Retrieves detailed information about a specific product by its unique ID.

### Update Product

- **Method**: `PATCH`
- **Endpoint**: `/api/product/update/:userId/:productId`
- **Description**: Allows administrators to update product information by specifying both the user and product ID.

### Delete Product

- **Method**: `DELETE`
- **Endpoint**: `/api/product/:userId`
- **Authorization**: Admin
- **Description**: Allows authorized administrators to delete products by specifying the user ID.

## Authorization

- For routes requiring authorization, an "Admin" role is necessary.
- Please include the appropriate authorization token when making requests to these routes.

## How to Use

1. Visit our live deployment at [Musicart on Render](https://musicart.onrender.com).
2. To interact with the API endpoints, use tools like Postman or any API client.
3. For authorization-required endpoints, include the admin authorization token in your request headers.

Example Authorization Header:  Authorization: <YOUR_ADMIN_AUTH_TOKEN>
