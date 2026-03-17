E-Commerce Web Application

A full-stack E-Commerce web application built using Spring Boot and React, designed to handle real-world shopping workflows including authentication, cart management, order processing, and stock updates.

 Features:
  Authentication & Security:
    - User registration and login
    - JWT-based authentication
    - Secure API endpoints using Spring Security
    - Stateless session management

 Product Management:
    - View all products
    - Product details page
    - Product images and branding
    - Dynamic stock handling

 Cart Functionality
    - Add items to cart
    - Remove items from cart
    - Update quantities
    - Persistent cart per user

 Order Management:
    - Place orders from cart
    - View all orders
    - View detailed order items and information
    - Automatic stock update after order
    - Cancel individual items from an order
    - Order amount recalculation

Image Upload Support:
    Product images stored on backend
    Served through API endpoints

 Stock Management:
    - Stock automatically updates after order placement
    - Stock restores when order items are cancelled
    - Prevents invalid purchases when stock is insufficient

 Advanced Features Implemented

    - Real-time UI updates after item cancellation
    - Proper handling of last-item deletion (order removal)
    - Optimized frontend state updates (no unnecessary API calls)
    - Clean separation of backend logic and frontend UI behavior
    - Secure user-specific order access (userId validation)

TECH STACK
 Backend :-
    Java
    Spring Boot
    Spring Security
    JWT Authentication
    Spring Data JPA
    Maven
    Hibernate
    Rest APIs

Frontend :-
    React.js
    JavaScript
    Axios
    React Router
    CSS

Backend:
    PostgreSQL

Project Structure
ecommerce/

ecommerce/
    ecommerce-backend/      
        |── configuration/      
        |── controller/        
        |── dto/                
        |── model/             
        |── repository/         
        |── service/           
    ecommerce_frontend/    
        ├── src/
        |   ├── Pages/
        |   |── components/
        |   |── api/
        |   |── services/
        |── public/

Backend architecture:
    Controllers:
        CartController.java
        ProductController.java
        UserController.java

    Services:
        CartService.java
        JwtService.java
        MyUserDetailsService.java
        OrderService.java
        ProductService.java
        UserService.java

    Models:
        CartItem.java
        Order.java
        OrderItem.java
        Product.java
        UsersPrincipal.java
        Users.java
        
    Security / configuration:
        JwtFilter.java
        SecurityConfiguration.java

Key Functional Flow
 Order Placement:
    Add to Cart → Place Order → Save Order → Clear Cart → Update Stock
 Cancel Order Item:
    Select Item → Delete Item → Update Order Total
        ↓
    If last item → Delete entire order → Redirect to Orders page

Core Application Flow:
    User logs in
    Views products
    Adds products to cart
    Places order
    Stock is updated
    User can view order history and details

API Highlights:
    /auth/register — Register new user
    /auth/login — Login and receive JWT
    /products — Product operations
    /cart — Cart management
    /orders — Order operations

Future Improvements:
    Payment gateway integration(Razorpay)
    Admin dashboard(to manage products)
    Pagination
    Order status tracking
    Email notifications
    Deployment (Docker / Cloud)

This project demonstrates a real-world scalable e-commerce system with proper backend architecture, 
            secure authentication, and efficient frontend state management.


HOW TO RUN:
    Frontend:
        1.cd ecommerce-frontend
        2.npm install
        3.npm start
        - will run on http://localhost:3000
    BAckend:
        1.navigate : cd ecommerce-backend
        2.Configure database in application.properties
        3.run : mvn spring-boot:run
        - will start on http://localhost:8080

Challenges Solved:
    Handling deletion of last item in an order
    Avoiding incorrect UI state after backend updates
    Managing React state vs backend data consistency
    Preventing misuse of exceptions for business logic
    Ensuring correct identifiers (orderItemId vs productId)
    
Example Challenges:

->Incorrect Identifier Used for Cart Item Removal

        Problem:
            Initially, products were added to the cart using the product ID (since clicking “Add to Cart” sends the product ID).
                    The same logic was mistakenly used for removing items from the cart.
            However, once a product is inside the cart, it is represented by a cart item ID, not the product ID.

        This caused:
            Random removal behavior
            Incorrect item deletions
            No clear visual error on UI
            Difficult debugging

        Root Cause:
            Mismatch between frontend action and backend entity identity.

        Solution:
            Switched removal logic to use cart item ID instead of product ID
            Updated API endpoints and frontend calls accordingly

        Lesson Learned:
            Operations on derived entities (cart items) must use their own identifiers, not the parent entity IDs.

->Data Type Mismatch Between Frontend and Backend (Null ID Issue)

        Problem:
            While implementing order creation, the frontend initially sent the order ID as null before the database generated it.

        Backend entity used a primitive type:
            private int orderId;

        Java primitives cannot hold null, causing deserialization failure.

        Error Cause:
            Spring could not map a null value to a primitive field.

        Solution:

            Replaced primitive type with wrapper class:
                - private Integer orderId; (or)
                - private Long orderId;

        Wrapper classes allow null until persistence layer assigns a value.

        Lesson Learned:
            Always use wrapper types for entity IDs that may be unset during request processing.



->JSON Recursion Error Due to Circular Entity Relationships

        Error Message:
                Document nesting depth exceeds maximum allowed

        Also known as:
                JSON recursion error

        Infinite serialization loop
            - HttpMessageNotWritableException

        Cause : Entities had a bidirectional relationship:

        One Order → Many OrderItems

        Many OrderItems → One Order

        Order → OrderItem (OneToMany)
        OrderItem → Order (ManyToOne)

        When Spring attempted to convert entities to JSON:

        Order includes OrderItems

        Each OrderItem includes Order

        That Order again includes OrderItems

        Loop continues infinitely

        Solution

        Used Jackson annotations to break the circular reference.

         — Managed / Back Reference
             @JsonBackReference
            private Order order;

            @JsonManagedReference
            private List<OrderItem> items;

        Result:
            Serialization becomes:
                Order → OrderItems → (stop)

           
