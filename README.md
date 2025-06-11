# TaskFlow ✅

> A beautiful, feature-rich to-do list application built with React, TypeScript, and Tailwind CSS

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://neon-salamander-28798c.netlify.app)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Features

- ✨ **Modern UI/UX** - Clean glass-morphism design with smooth animations
- 📝 **Task Management** - Add, edit, delete, and mark tasks as complete
- 🎯 **Priority Levels** - Organize tasks with low, medium, and high priorities
- 🔍 **Smart Filtering** - Filter by all, active, or completed tasks
- 📊 **Flexible Sorting** - Sort by date, alphabetical order, or priority
- 💾 **Persistent Storage** - Tasks automatically saved to localStorage
- 📈 **Real-time Statistics** - Track total, active, and completed tasks
- 📱 **Responsive Design** - Works seamlessly across all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed

## 🚀 Live Demo

Experience TaskFlow in action: **[https://neon-salamander-28798c.netlify.app](https://neon-salamander-28798c.netlify.app)**

## 📸 Screenshots

### Desktop View
![TaskFlow Desktop](https://via.placeholder.com/800x500/4F46E5/FFFFFF?text=TaskFlow+Desktop+View)

### Mobile View
![TaskFlow Mobile](https://via.placeholder.com/400x600/4F46E5/FFFFFF?text=TaskFlow+Mobile+View)

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Storage:** Browser localStorage
- **Deployment:** Netlify

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoInput.tsx      # Task input with priority selection
│   ├── TodoItem.tsx       # Individual task component
│   ├── TodoList.tsx       # Task list container
│   └── TodoFilters.tsx    # Filters and statistics
├── hooks/
│   └── useTodos.ts        # Custom hook for task logic
├── types/
│   └── todo.ts           # TypeScript definitions
├── App.tsx               # Main app component
└── main.tsx             # App entry point
```

## 🎯 Usage

### Adding Tasks
1. Enter your task in the input field
2. Select priority level (Low, Medium, High)
3. Click "Add" or press Enter

### Managing Tasks
- **Complete:** Click the checkbox to mark as done
- **Edit:** Click the edit icon to modify task text
- **Delete:** Click the X icon to remove task

### Filtering & Sorting
- **Filter:** Choose between All, Active, or Completed tasks
- **Sort:** Order by Date Added, Alphabetical, or Priority
- **Clear:** Remove all completed tasks at once

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add new tasks with different priorities
- [ ] Mark tasks as complete/incomplete
- [ ] Edit existing task text
- [ ] Delete individual tasks
- [ ] Filter tasks by status
- [ ] Sort tasks by different criteria
- [ ] Clear all completed tasks
- [ ] Verify localStorage persistence (refresh page)
- [ ] Test responsive design on mobile

### Running Tests

```bash
# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Lucide React](https://lucide.dev/) - For clean, consistent icons
- [Vite](https://vitejs.dev/) - For fast development experience

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername) - your.email@example.com

Project Link: [https://github.com/yourusername/taskflow](https://github.com/yourusername/taskflow)

---

⭐ **Star this repo if you found it helpful!** ⭐