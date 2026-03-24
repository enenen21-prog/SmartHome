Link to the website: https://enenen21-prog.github.io/SmartHome/

!!!!!!!!!! Under Construction !!!!!!!!!

Smart Indoor Environment Monitoring System

This document describes a full-stack smart indoor monitoring system including user management,
rooms, devices, sensor sampling, dashboards, alerts, external weather integration, and tips
generation.

1. User & Rooms Management

1 Each user can register and log in securely using JWT authentication.

2 A user can create and manage multiple rooms (e.g. Living Room, Bedroom, Office).

3 Rooms can be deleted, which also removes their associated devices.


2. Devices & Sensors

1 Each room can contain multiple devices.

2 Each device samples four sensors: Temperature, Humidity, COn, and Light.

3 Devices can be deleted independently from rooms.


3. Sensor Sampling

1 Sensor data is generated every one minute by a simulator or IoT device.

2 Each sample is sent to the backend using an HTTP API.

3 Samples are stored as time-series data in a SQL database.


4. Dashboard & Graphs

1 The user dashboard displays four graphs: Temperature, Humidity, COn, and Light.

2 Graphs can be viewed by time range: last day, last week, or last month.

3 Users select a room and device to view relevant sensor data.


5. External Weather Integration

1 The system displays the current temperature in the user’s city.

2 Weather data is retrieved from a third-party API such as Google or OpenWeather.


6. Technology Stack

1 Frontend: React, Charts library (Chart.js / Recharts)

2 Backend: ASP.NET Core Web API, Entity Framework Core

3 Database: SQL Server (time-series optimized)

# SmartHome Project Overview

This document explains the SmartHome project by components, backend services, and CSS/design system. It is intended as a presentation guide for the implementation and architecture.

---
## 1) Project Structure (High Level)

- `backend/MyAPi/`  
  ASP.NET Core Web API + EF Core (SQLite) backend.
- `FrontEnd/`  
  React + Vite frontend, styled with Tailwind CSS.

---
## 2) Backend (ASP.NET Core API)

### 2.1 Entry Point and Configuration

- **File:** `backend/MyAPi/Program.cs`  
  - Configures the SQLite database path (`Database/SmartHomeDb.sqlite`).  
  - Registers services and controllers.  
  - Enables CORS for the React dev server.  
  - Runs a small seed/test routine (`SampleDbTest`) for initial data.

### 2.2 Database Context and Entities

- **File:** `backend/MyAPi/Data/SmartHomeDbContext.cs`  
  - EF Core DbContext with DbSets:
    - `Rooms`, `Devices`, `Samples`, `Users`, `HomeLocation`

#### Entities
- **Room:** `backend/MyAPi/Data/Entities/Room.cs`  
  - `Id`, `Title`, `Description`
- **Device:** `backend/MyAPi/Data/Entities/Device.cs`  
  - `Id`, `Name`, `Ipv4Address`, `RoomId`
- **Sample:** `backend/MyAPi/Data/Entities/Sample.cs`  
  - `Id`, `DeviceId`, `Temperature`, `Humidity`, `Light`, `Co2`, `TimestampUtc`
- **User:** `backend/MyAPi/Data/Entities/User.cs`  
  - `Id`, `FirstName`, `LastName`, `Email`, `Password`, `Role`
- **HomeLocation:** `backend/MyAPi/Data/Entities/HomeLocation.cs`  
  - `City`, `Country`, `UpdatedAtUtc`

### 2.3 Controllers (API Endpoints)

#### Rooms
- **File:** `backend/MyAPi/Controllers/RoomsController.cs`  
  - `GET /api/rooms` → list rooms  
  - `POST /api/rooms` → create room  
  - `DELETE /api/rooms/{id}` → delete room

#### Devices
- **File:** `backend/MyAPi/Controllers/DevicesController.cs`  
  - `GET /api/devices/room/{roomId}` → list room devices  
  - `POST /api/devices` → create device  
  - `DELETE /api/devices/{id}` → delete device

#### Samples
- **File:** `backend/MyAPi/Controllers/SamplesController.cs`  
  - `GET /api/samples?roomId=&deviceId=&range=` → sample history by time range  
  - `POST /api/samples` → add a sample

#### Users
- **File:** `backend/MyAPi/Controllers/UsersController.cs`  
  - `POST /api/users/login` → login  
  - `GET /api/users` → list users  
  - `POST /api/users` → create user  
  - `DELETE /api/users/{id}` → delete user  
  - Passwords are hashed with a SHA‑256 helper.

#### Location
- **File:** `backend/MyAPi/Controllers/LocationController.cs`  
  - `GET /api/location` → get home location  
  - `PUT /api/location` → save/update home location

#### Weather
- **File:** `backend/MyAPi/Controllers/WeatherController.cs`  
  - `GET /api/weather/current` → current weather for saved location  
  - Uses Open‑Meteo geocoding + forecast endpoints.

### 2.4 Services Layer

Services handle database logic:

- **RoomService:** `backend/MyAPi/Services/RoomService.cs`  
  - CRUD for rooms; includes cascading deletes in code.
- **DeviceService:** `backend/MyAPi/Services/DeviceService.cs`  
  - CRUD for devices; deletes device samples first.
- **SampleService:** `backend/MyAPi/Services/SampleService.cs`  
  - Adds samples, validates device existence, queries by time range.

### 2.5 Security

- **Password hashing:** `backend/MyAPi/Security/PasswordHasher.cs`  
  - Uses SHA‑256 with static + per‑user salt.

---
## 3) Frontend (React + Tailwind)

### 3.1 App Entry

- **File:** `FrontEnd/src/App.jsx`  
  - Handles login state, role, routing between sections (rooms, dashboard, users, location, view-data).

### 3.2 Layout

- **Sidebar:** `FrontEnd/src/components/MenuSidebar.jsx`  
  - Navigation menu and logout.

- **Main content:** Rendered by `App.jsx` based on selected menu.

### 3.3 Rooms

- `RoomsPage.jsx` → decides which rooms sub‑view to show  
- `RoomsList.jsx` → list view  
- `RoomItem.jsx` → single room row  
- `NewRoom.jsx` → add room form  
- `SelectedRoom.jsx` → room details  

### 3.4 Devices

- `Devices.jsx` → devices list for selected room  
- `DeviceItem.jsx` → single device row  
- `NewDevice.jsx` → add device form

### 3.5 View Data (Charts + Weather)

- `ViewData.jsx` → fetches samples + weather and renders below  
- `RangeSelect.jsx` → time range selector  
- `ChartsGrid.jsx` → grid of charts  
- `ChartCard.jsx` → each chart (Recharts)  
- `WeatherCard.jsx` → current weather summary

### 3.6 Users

- `UsersPage.jsx` → user list + form  
- `UserForm.jsx` → create user form  
- `UserItem.jsx` → user row  
- `useUserActions.jsx` → create/delete logic separated from UI

### 3.7 Location

- `LocationPage.jsx` → city + country form  
- `LocationInput.jsx` → shared input for location fields

---
## 4) CSS & Design System (Tailwind)

### 4.1 Core Style Direction

The UI uses a dark, glassmorphism style:
- Transparent panels with blur
- Soft borders
- Light text on dark background

Key design tokens (examples):
- Background: `bg-white/5` and `bg-[#0b1220]`
- Borders: `border border-white/10`
- Shadows: `shadow-[0_20px_40px_rgba(15,23,42,0.25)]`
- Text: `text-slate-100`, `text-slate-400`

### 4.2 Reusable Components

Reusable UI components include:
- `Button.jsx` (main CTA button)
- `Input.jsx` (text input fields)
- `ConfirmModal.jsx` (delete confirmation)
- `SelectInput.jsx` (select dropdowns)

---
## 5) Data Flow Summary

- **Rooms/Devices**  
  - Frontend → API → Services → SQLite  
  - Deleting a room cascades to devices and samples (code‑level).
  - Deleting a device removes its samples (code‑level).

- **Samples**  
  - `ViewData` requests samples by time range for selected room+device.

- **Weather**  
  - Stored city/country in DB → API resolves coordinates → fetches weather.

- **Users**  
  - Create user from UI → hashed password stored in DB.
  - Login returns role for UI permissions.

---
