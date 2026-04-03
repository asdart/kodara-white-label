import Dashboard from './components/Dashboard';
import { ThemeProvider } from './lib/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="w-full h-screen">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
