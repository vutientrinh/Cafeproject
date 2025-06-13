## Cafe Management System - React Frontend

This document describes the frontend application for the Cafe Management System, built with ReactJS.

### Technologies

* Frontend: ReactJS
* HTTP Library: Axios
* UI Framework: Bootstrap

### Features

* **Ordering:**
    * Staff/Manager can create orders for customers with beverages (quantity, size), toppings (quantity), and apply loyalty discounts based on customer rank (up to 10%).
    * System identifies customer birthdays and offers a free food gift on the first birthday order of the year.
* **Product/Topping/Staff/Customer Management:**
    * Manager can CRUD (Create, Read, Update, Delete) products, toppings, staff, and customer information (through backend API interactions).
* **Receipt Management:**
    * Manager can view a list of receipts (all or filtered by date) with detailed information on ordered items (beverages, toppings) (through backend API interactions).
* **Reporting:**
    * Manager can access a dashboard with statistical tables or charts on various categories (through backend API interactions).
    * Data export to Excel functionality can be implemented (requires additional libraries).

### Setup and Usage

1. Clone this repository and open it in your preferred IDE (Visual Studio Code recommended).
2. Install the project dependencies:
    ```bash
    npm install
    ```
3. Ensure the backend project [cafe-backend](https://github.com/dunglq3110/cafe-backend/) is running on a separate terminal.
4. Start the frontend development server:
    ```bash
    npm run start
    ```
5. Access the application in your browser (usually at http://localhost:3000 by default).

**Default Manager Credentials:**

* Username: managerCafe123
* Password: managerCafe123
