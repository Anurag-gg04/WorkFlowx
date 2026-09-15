# 🚀 WorkFlowX — Team Workspace

<div align="center">

**A modern team workspace for managing tasks, projects, communication, meetings, and day-to-day collaboration in one place.**


## ✨ Features

- 📊 Interactive Dashboard
- 📁 Project Management
- ✅ Task Management
- 📝 To-Do List
- 📅 Calendar View
- 📌 Kanban Board
- 📈 Progress Tracking
- 📊 Charts & Statistics
- 🌙 Dark / Light Theme
- 🔍 Search Functionality
- 📱 Fully Responsive Design
- 💾 Local Storage Data Persistence
- ⚡ Smooth Animations
- 🎨 Modern Glassmorphism UI
=======
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge\&logo=netlify\&logoColor=white)

</div>
>>>>>>> afb3dd8cc666827928486de57006347be041802e

---

## 📌 About

**WorkFlowX** is a browser-based team workspace designed to bring common workplace activities into one dashboard.

Instead of switching between separate tools for tasks, projects, team conversations, meetings, calendars, notes, and employee information, WorkFlowX puts these features together in a single interface.

The project is built with **HTML, CSS, and JavaScript** and uses browser `localStorage` for storing application data.

It also includes a complete authentication flow, responsive navigation, notifications, global search, customizable appearance settings, and interactive workspace modules.

---

## ✨ Features

### 🔐 Authentication

WorkFlowX starts with an authentication screen where users can:

* Sign in
* Create a new account
* Show/hide passwords
* Remember their session
* Use the demo account
* Sign out
* Reset/clear their local session

Demo credentials are available directly on the login screen:

```text
Email: admin@workflowx.com
Password: password123
```

> This authentication system is intended for demonstration purposes and uses browser storage rather than a production authentication server.

---

## 📊 Dashboard

The dashboard provides a quick overview of the workspace.

It includes:

* Sprint velocity score
* Assigned tasks
* Upcoming team meetings
* Team activity
* Contribution heatmap
* Sprint objectives
* Project and task statistics

The dashboard also supports quick task creation and customizable dashboard widgets.

---

## 📈 Analytics

The Analytics section provides a visual overview of team and project performance.

It includes:

* Engineering velocity trends
* Tasks by stage
* Department and squad throughput
* Top squad contributors
* Contribution metrics

This gives users a quick way to understand how work is progressing across the team.

---

## 📁 Projects

The Projects section provides a central place to manage ongoing initiatives.

Users can:

* View projects
* Create new projects
* Filter projects
* Track project progress
* View project priority
* Check project status
* View project deadlines
* See assigned team members

Projects are displayed with progress indicators to make their current status easy to understand.

---

## ⬛ Kanban Task Board

WorkFlowX includes an interactive Kanban board for task management.

Tasks can be organized into stages such as:

```text
Backlog
   ↓
To Do
   ↓
In Progress
   ↓
Done
```

Users can:

* Create tasks
* Set task priority
* Assign tasks
* Add descriptions
* Set due dates
* Move tasks between columns
* Delete tasks
* Track completed work

Tasks can also be moved using drag-and-drop interactions.

---

## 💬 Team Chat

The Team Chat module provides an internal communication interface.

It includes:

* General channel
* Development channel
* Team conversations
* Direct messages
* Message search
* Emoji picker
* Message reactions
* Unread message indicators
* Send messages using Enter

The chat interface is designed to feel like an integrated team communication tool rather than a separate application.

---

## 📅 Team Calendar

The Calendar section provides a monthly team calendar.

Users can:

* Navigate between months
* View scheduled events
* Add new calendar events
* Check upcoming schedules
* View event details

This makes it easier to keep track of team activities directly from the workspace.

---

## 🎥 Meeting Scheduler

The Meeting Scheduler allows users to manage team meetings.

It provides:

* Upcoming meetings
* Past discussions
* Meeting scheduling
* Meeting cancellation
* Meeting details
* Team information

New meetings can be created directly from the interface.

---

## 🏆 Peer Recognition

WorkFlowX includes a Peer Recognition section where team members can recognize each other's contributions.

Users can:

* Send kudos
* Select a teammate
* Add a recognition message
* React to recognition posts
* Filter recognition categories
* View the squad Wall of Fame
* View top contributors

This adds a social and collaborative element to the workspace.

---

## 👥 Employee Directory

The Employee Directory provides a searchable list of team members.

Users can search employees by:

* Name
* Role
* Squad

Each employee profile provides additional information and actions such as:

* View profile
* Start a conversation

---

## 📝 Workspace Notes

The Notes section provides a simple workspace note-taking system.

Users can:

* Create notes
* Edit notes
* Delete notes
* Search notes
* Add tags
* Remove tags
* Organize workspace information

Notes are stored locally in the browser.

---

## ⏱️ Activity Timeline

The Activity Timeline keeps track of important workspace actions.

It can display activities such as:

* Task creation
* Task completion
* Project changes
* Meetings
* Recognition
* Other workspace interactions

Timeline filters make it easier to focus on specific types of activity.

---

## 👤 User Profile

The profile section displays the current user's workspace information.

It includes:

* Profile avatar
* Name
* Role
* Department
* Bio
* Contact information
* Profile statistics
* Recent contribution history

Users can also update their profile information through the settings area.

---

## ⚙️ Workspace Settings

WorkFlowX provides several customization options.

### Profile Settings

Users can update profile information such as:

* First name
* Last name
* Role
* Department
* Bio

### Notification Settings

Users can control notifications for:

* Task updates
* Kudos
* Meetings
* Mentions
* Weekly reports

### Appearance

The application supports theme customization, including:

* Dark mode
* Light mode
* Accent color customization

### Privacy & Security

Users can control settings such as:

* Online visibility
* Activity sharing
* Direct messages

There is also a local data clearing option.

---

## 🔔 Notifications

WorkFlowX has a built-in notification center.

Notifications can be generated for events such as:

* Task updates
* Meetings
* Recognition
* Mentions
* Workspace activities

Users can also mark all notifications as read.

---

## 🔎 Global Search

The application includes a global search interface that can be opened from the workspace.

Search can be used to find information across areas such as:

* Tasks
* Projects
* API documentation
* Pull requests
* Team members

The interface also supports keyboard interaction such as:

```text
Ctrl + K → Open Search
ESC     → Close Search
↑ / ↓   → Navigate results
Enter   → Select
```

---

## 💾 Local Data Storage

WorkFlowX uses the browser's `localStorage` API to maintain application data.

The application stores workspace information under keys such as:

```text
workflowx_data
workflowx_users
workflowx_session
```

This allows the application to preserve data between page refreshes without requiring a backend database.

---

## 🛠️ Tech Stack

| Technology           | Purpose                                      |
| -------------------- | -------------------------------------------- |
| **HTML5**            | Application structure                        |
| **CSS3**             | Layout, responsive design, animations and UI |
| **JavaScript ES6**   | Application logic and interactions           |
| **LocalStorage API** | Client-side data persistence                 |
| **SVG / CSS**        | Visual components and charts                 |
| **Google Fonts**     | Inter & JetBrains Mono                       |
| **Netlify**          | Deployment                                   |

No external JavaScript framework or backend server is required.

---

## 🎨 UI & Design

WorkFlowX uses a modern productivity-dashboard design with a dark glassmorphism-inspired interface.

The UI includes:

* Glass-effect cards
* Sidebar navigation
* Responsive layouts
* Animated background elements
* Interactive cards
* Progress indicators
* Modal dialogs
* Toast notifications
* Custom badges
* Avatars
* Dark/light themes
* Accent color customization

The application uses:

* **Inter** for the main interface
* **JetBrains Mono** for technical/monospace elements

---

## 📂 Project Structure

```text
WorkFlowX/
│
├── index.html
│   └── Application structure and UI
│
├── style.css
│   └── Styling, layouts, animations and responsive design
│
├── app.js
│   └── Application state, authentication,
│       routing and feature logic
│
└── README.md
    └── Project documentation
```

---

## 🧩 Application Architecture

The application is organized around separate JavaScript modules for different parts of the workspace.

```text
                    WorkFlowX
                       │
          ┌────────────┴────────────┐
          │                         │
     Authentication             App Shell
          │                         │
          └────────────┬────────────┘
                       │
                 Application State
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Dashboard       Projects         Kanban
       │               │                │
       ├───────────────┼────────────────┤
       │               │                │
       ▼               ▼                ▼
     Chat           Calendar         Meetings
       │               │                │
       ├───────────────┼────────────────┤
       │               │                │
       ▼               ▼                ▼
 Recognition       Directory          Notes
       │               │                │
       └───────────────┼────────────────┘
                       ▼
               Timeline / Profile
                       │
                       ▼
                   Settings
```

---

## ⚙️ How It Works

### 1. Authentication

When the application starts, the authentication module checks whether a valid local session exists.

If there is no session, the login screen is displayed.

After successful authentication, the main workspace becomes available.

### 2. Application State

The project uses a central application state to manage information such as:

* User information
* Tasks
* Projects
* Messages
* Meetings
* Calendar events
* Notifications
* Recognition posts
* Notes
* Timeline activities
* Settings

Changes to the state are persisted using `localStorage`.

### 3. Client-Side Routing

The application uses a lightweight client-side router to switch between workspace sections without reloading the page.

For example:

```text
Dashboard
Analytics
Projects
Kanban
Chat
Calendar
Meetings
Recognition
Directory
Notes
Timeline
Profile
Settings
```

### 4. Live UI Updates

When users perform actions such as creating a task, scheduling a meeting, sending kudos, or changing settings, the application updates the relevant interface and records the activity.

Toast notifications provide immediate feedback for many actions.

---

## 🚀 Getting Started

### Requirements

No build tools or package installation are required.

You only need a modern browser:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

### Run Locally

Clone the repository:

```bash
git clone https://github.com/Anurag-gg04/WorkFlowX.git
```

Navigate to the project:

```bash
cd WorkFlowX
```

Open:

```text
index.html
```

directly in your browser.

For development, you can also use **VS Code Live Server**.

---

## 🌐 Deployment

The project is deployed using **Netlify**.

Netlify project dashboard:

[WorkFlowX Netlify Project](https://app.netlify.com/projects/workflwx/overview?utm_source=chatgpt.com)

> The URL above is the Netlify management dashboard. For a README's **Live Demo** button, use the public `*.netlify.app` URL generated by your deployment.

---

## 🔐 Security Note

WorkFlowX is a frontend demonstration project.

Although it includes an authentication interface, session handling, privacy settings, and local data persistence, it does **not** use a production backend authentication system.

<<<<<<< HEAD
## 👨‍💻 Author

**Anurag Tomar**

B.Tech Computer Science Engineering

GitHub: https://github.com/Anurag-gg04

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.

It motivates me to build more projects.
=======
Sensitive information should therefore not be entered into the application.

A production version would require proper:

* Server-side authentication
* Password hashing
* Session management
* Authorization
* Database security
* API security
* HTTPS
* Secure cookie configuration
* Input validation
* Access control
>>>>>>> afb3dd8cc666827928486de57006347be041802e

---

## 📄 License

This project is intended for educational and portfolio purposes.

Feel free to modify and extend it for your own learning and development.

---

## 👨‍💻 Author

### Anurag Tomar

**B.Tech — Computer Science & Engineering**

GitHub:
https://github.com/Anurag-gg04

---

<div align="center">

### ⭐ If you like WorkFlowX, consider giving the repository a star.

**Built with HTML, CSS & JavaScript.**

</div>
