import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  TableCraft
                </h1>
                <span className="ml-2 text-sm text-gray-500">
                  Project Management
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="btn btn-primary">
                  New Task
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Welcome to TableCraft
            </h2>
            <p className="text-gray-600">
              A modern project management tool with table-based interface, 
              drag-and-drop functionality, and AI-powered task recommendations.
            </p>
            <div className="mt-6 flex space-x-4">
              <button className="btn btn-primary">
                Get Started
              </button>
              <button className="btn btn-secondary">
                View Demo
              </button>
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
