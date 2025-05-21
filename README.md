# TableCraft 🚀

A modern, open-source project management web app with table-based UI, drag-and-drop functionality, and AI-powered task recommendations.

## ✨ Features

- 📊 **Table-Based Project Management** - Organize tasks in customizable tables
- 🎯 **Priority Tagging** - Assign urgent, normal, or low priorities with visual indicators
- 👥 **Team Workload Visualization** - Track task completion rates and workload distribution
- 📋 **Kanban View** - Switch between table and board-style views
- 🤖 **AI Task Recommendations** - Smart task prioritization using TensorFlow.js
- 🔄 **Real-Time Collaboration** - Live updates and team chat with Socket.IO
- 🎨 **Modern UI/UX** - Beautiful design with Tailwind CSS and Framer Motion animations

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, react-dnd, Framer Motion
- **Backend**: Node.js, Express, TypeScript, Sequelize
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Real-time**: Socket.IO
- **AI**: TensorFlow.js
- **Build Tools**: Vite, ESLint, Prettier

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tablecraft.git
   cd tablecraft
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.example frontend/.env
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd backend && npm run dev
   
   # Terminal 2: Start frontend
   cd frontend && npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
tablecraft/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   ├── database/           # Database migrations & seeds
│   └── package.json
├── docs/                   # Documentation
├── .github/                # GitHub workflows & templates
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Good First Issues
- 🟢 UI component improvements
- 🟢 Bug fixes
- 🟢 Documentation updates
- 🟡 Feature implementations
- 🔴 Core architecture changes

## 📈 Roadmap

### Phase 1: MVP (Current)
- [x] Basic table interface
- [x] Drag and drop functionality
- [x] Priority tagging system
- [ ] Kanban view
- [ ] Basic API endpoints

### Phase 2: Enhanced Features
- [ ] AI task recommendations
- [ ] Real-time collaboration
- [ ] Custom workflows
- [ ] Dark mode
- [ ] Advanced animations

### Phase 3: Advanced Features
- [ ] PWA support
- [ ] Plugin system
- [ ] Performance optimizations
- [ ] Enterprise features

## 📊 Community Goals

- 🎯 **1,000-5,000 GitHub Stars** by end of 2025
- 👥 **Active contributor community** with 50+ contributors
- 🌟 **Featured on** Dev.to, Reddit r/webdev, and Hacker News

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by NocoDB's table management approach
- Built with modern web technologies for developer experience
- Community-driven development approach

---

**Made with ❤️ by the TableCraft community** 