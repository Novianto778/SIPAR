import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-6 px-6 py-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Hallo</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
