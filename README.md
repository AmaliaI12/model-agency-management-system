# Modeling Agency Management System

This is a comprehensive web application designed to manage the operations of multiple modeling agencies. It provides a centralized platform for agencies to efficiently handle their models, clients, events, and contracts.

The application is built with a modern architecture, providing a web-based interface accessible from any browser.

## Technology Stack

* **Frontend:** React
* **Backend:** Node.js
* **Database:** SQL Server

## Key Features

* **Entity Management:** Efficiently manage all information related to models, clients, agencies, and events.

* **CRUD Operations:** Full Create, Read, Update, and Delete (INSERT, UPDATE, DELETE) capabilities for all database tables.

* **Event & Participation Tracking:** Manages the N:N relationship between models and events, allowing the tracking of which models attended an event, what events a model participated in, and the fees paid.

* **Contract Management:** Store and track contracts between models and clients. Users can create new contracts and view active or expired ones.

* **Advanced Search & Filtering:** Allows users to query the database using various criteria, such as models of a certain age, events in a specific city, or active contracts.

* **Reporting & Statistics:** Generate complex reports through SQL queries, including:

  * Number of models per agency.
  * Top models based on event participation.
  * Total contract value per client.

## User Roles

The application supports three distinct user roles with specific permissions[cite: 10]:

1. **Admin**
    * Manages all agencies within the system (create/delete).
    * Monitors the global activity of the platform[cite: 21].
2. **Agency Manager**
    * Has full CRUD (add/modify/delete) permissions for their *own* agency's models, clients, events, and contracts.
    * Can view reports and statistics specific to their agency.
    * Manages the client accounts associated with their agency.
3. **Client**
    * Can view models and events belonging to a specific agency.
    * Can submit collaboration requests or propose contracts.
    * Has limited access with no administrative rights.

## Database Schema

The database is designed to handle all core entities and their relationships.

### Main Tables

* **Agentii (Agencies):** Stores agency information (Name, Address, Contact).
* **Utilizatori (Users):** Manages user accounts, passwords, and roles (admin, client).
* **Modele (Models):** Contains detailed model profiles (Name, Age, Height, Weight, Gender, etc.) and links them to an agency and a category.
* **Categorii (Categories):** Defines model categories (e.g., Fashion, Commercial).
* **Clienti (Clients):** Information about clients (individuals or companies) who hire models.
* **Evenimente (Events):** Details about events (Title, Date, Budget, Location) organized by clients.
* **Locatii (Locations):** Stores information about event venues (Name, Address, City, Capacity).
* **Contracte (Contracts):** Manages contracts between models and clients, including type, status (Active/Expired), and value.
* **Participari (Participations):** A junction table to manage the N:N relationship between Models and Events, storing the model's role and fee for each event.
