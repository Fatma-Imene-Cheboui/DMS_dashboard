import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import OverviewPage from './Pages/OverviewPage'
import UsersPage from './Pages/UsersPage'
import Sidebar from './components/Sidebar'
import SettingsPage from './Pages/SettingsPage'
import DocumentsPage from './Pages/DocumentsPage'
import PreviewPage from './Pages/PreviewPage'
import AddUserPage from './Pages/AddUserPage'
import LoginPage from './Pages/LoginPage'
import { useSelector } from 'react-redux'  // 🔥 Import Redux hook

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  // 🔥 Get auth state from Redux

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90' />
        <div className='absolute inset-0 backdrop-blur-md' />
      </div>

      <div className='relative z-10 flex h-screen w-full'>
        {isAuthenticated && <Sidebar />}

        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={isAuthenticated ? <OverviewPage /> : <Navigate to="/login" />} />
          <Route path='/users' element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
          <Route path='/settings' element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path='/documents' element={isAuthenticated ? <DocumentsPage /> : <Navigate to="/login" />} />
          <Route path='/preview/:userId' element={isAuthenticated ? <PreviewPage /> : <Navigate to="/login" />} />
          <Route path='/add-user' element={isAuthenticated ? <AddUserPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
