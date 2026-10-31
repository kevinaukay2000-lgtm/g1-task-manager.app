# Student Task Manager

A production-quality, responsive web application for students to manage assignments, projects, and academic deadlines.

## 🚀 Features

### Dashboard
- **Real-time Stats**: Overview of Total, Pending, Completed, and Overdue tasks.
- **Progress Tracking**: Visual progress bar showing overall completion percentage.
- **Upcoming Deadlines**: A curated list of tasks due within the next 7 days.

### Task Management
- **Full CRUD**: Add, edit, delete, and toggle completion status of tasks.
- **Priority System**: Color-coded badges for Low, Medium, and High priority.
- **Smart Deadlines**: Friendly labels like "Due today", "Due tomorrow", or "3 days overdue".
- **Advanced Filtering**: Search by title/description and filter by subject, status, or priority.
- **Custom Sorting**: Sort tasks by deadline, priority, or creation date.

### Subject Management
- **Custom Categories**: Add, rename, or delete subjects to organize your work.
- **Safe Deletion**: Deleting a subject automatically reassigns tasks to "Unassigned".

### Settings & Personalization
- **Theming**: Support for Light, Dark, and System (auto-detect) modes.
- **Accent Colors**: Choose a primary accent color to personalize the UI.
- **Data Control**: Options to clear completed tasks or perform a full factory reset of all data.

## 📁 Folder Structure

```text
src/
  ├── components/        # Reusable UI components
  │   ├── common/        # Button, Modal, Toast, Badge, EmptyState
  │   ├── dashboard/     # StatCard, ProgressBar, UpcomingList
  │   ├── tasks/         # TaskCard, TaskList, TaskForm, DatePickerField
  │   └── subjects/      # SubjectManager
  ├── constants/         # App-wide constants (priorities, storage keys)
  ├── context/           # Global state (Task, Settings, Toast)
  ├── hooks/             # Custom hooks for business logic
  ├── screens/           # Page-level components (Dashboard, Tasks, etc.)
  ├── services/           # Storage abstraction (localStorage wrapper)
  ├── styles/            # CSS variables, global, and module styles
  └── utils/             # Pure helper functions (date, task logic)
```

## 🛠️ Technical Stack
- **Framework**: React (JavaScript)
- **Build Tool**: Vite
- **Styling**: Plain CSS with CSS Variables (Custom Properties)
- **Storage**: LocalStorage (via an async service wrapper)

## 🏃 How to Run

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

### Access on Phone/Tablet
The app is configured for local network access.
1. Ensure your PC and mobile device are on the same Wi-Fi network.
2. Run `npm run dev`.
3. Look for the **Network** URL in the terminal (e.g., `http://192.168.x.x:5173`).
4. Open that URL in your mobile browser.

## 💾 Storage Mechanism
The app uses a service-based approach to data persistence:
- **Tasks**: Stored under `stm:tasks`
- **Subjects**: Stored under `stm:subjects`
- **Settings**: Stored under `stm:settings`

All storage calls are wrapped in `async` functions to ensure that the application remains responsive and can be easily migrated to a cloud database or `AsyncStorage` in the future.
