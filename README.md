# TableCraft

TableCraft is an open-source project management web app focused on a table-based UI, drag-and-drop functionality, and AI-powered task recommendations.

## Features

- Table-based project management
- Priority tagging (urgent, normal, low)
- Team workload visualization
- Kanban view (planned)
- AI task recommendations (planned)
- Real-time collaboration (planned)
- Modern UI/UX

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, react-dnd, Framer Motion
- Backend: Node.js, Express, TypeScript, Sequelize
- Database: SQLite (development) / PostgreSQL (production)
- Real-time: Socket.IO
- AI: TensorFlow.js
- Build Tools: Vite, ESLint, Prettier

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/tablecraft.git
   cd tablecraft
   ```

2. Install dependencies
   ```bash
   # Backend dependencies
   cd backend && npm install
   
   # Frontend dependencies
   cd ../frontend && npm install
   ```

3. Set up environment variables
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   # (frontend/.env.example does not exist by default; create if needed)
   ```

4. Start development servers
   ```bash
   # Terminal 1: Start backend
   cd backend && npm run dev
   
   # Terminal 2: Start frontend
   cd frontend && npm run dev
   ```

5. Open your browser
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Project Structure

```
tablecraft/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── assets/          # Static assets (react.svg)
│   │   ├── hooks/           # Custom React hooks (currently empty)
│   │   ├── pages/           # Page components (currently empty)
│   │   └── utils/           # Utility functions (currently empty)
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers (currently empty)
│   │   ├── types/           # Type definitions (index.ts)
│   │   └── utils/           # Utility functions (currently empty)
│   └── package.json
├── docs/                    # Documentation
└── README.md
```

※ The above structure reflects the actual folders/files in the project. (components, services, types, models, routes, middleware, etc. do not currently exist)

## Contributing

We welcome contributions! For details, see the [Contributing Guide](CONTRIBUTING.md).

### Good Contribution Areas
- UI improvements
- Bug fixes
- Documentation updates
- Feature implementation (planned)
- Core architecture changes (with caution)

## Roadmap

### Phase 1: MVP (In Progress)
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

## License

Distributed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by NocoDB's table management approach
- Built with modern web technologies
- Community-driven development

---

Made by the TableCraft community. 