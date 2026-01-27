Under Construction...

Link: https://enenen21-prog.github.io/SmartHome/


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

2 Each device samples four sensors: Temperature, Humidity, COn, and Air Pollution.

3 Devices can be deleted independently from rooms.


3. Sensor Sampling

1 Sensor data is generated every one minute by a simulator or IoT device.

2 Each sample is sent to the backend using an HTTP API.

3 Samples are stored as time-series data in a SQL database.


4. Dashboard & Graphs

1 The user dashboard displays four graphs: Temperature, Humidity, COn, and Air Pollution.

2 Graphs can be viewed by time range: last day, last week, or last month.

3 Users select a room and device to view relevant sensor data.


5. External Weather Integration

1 The system displays the current temperature in the user’s city.

2 Weather data is retrieved from a third-party API such as Google or OpenWeather.

3 Weather responses are cached to reduce external API calls.


6. Alerts & Notifications

1 Users can define alerts for sensor thresholds (greater than / less than).

2 Alerts can be configured per room or per device.

3 When triggered, alerts send email notifications to configured recipients.

4 Alert history and cooldown logic prevent notification spam.


7. Tip of the Hour

1 The system generates a contextual tip every hour.

2 Tips are based on recent sensor readings and trends.

3 Examples include ventilation advice or air quality recommendations.


8. Technology Stack

1 Frontend: React, Charts library (Chart.js / Recharts)

2 Backend: ASP.NET Core Web API, Entity Framework Core

3 Database: SQL Server (time-series optimized)
4 Notifications: Email (SMTP / SendGrid)
