import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import InvitationForm from './components/InvitationForm'
import Home from './components/Home'
import InvitationList from './components/InvitationList'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import UserList from './components/UserList'
import GradeList from './components/GradeList'
import Invitation from './components/Invitation'
import AdminUserList from './components/AdminUserList'
import AdminRequestList from './components/AdminRequestList'
import TeacherRequestList from './components/TeacherRequestList'
import Notification from './components/Notification'
import { UserRole } from './util/Role'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Navigation />
      <Notification />
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        
        <Route path='/' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER]}><Home /></ProtectedRoute>} />
        <Route path='/invitations' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER]}><InvitationList /></ProtectedRoute>} />
        <Route path='/invitations/:id' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER]}><Invitation /></ProtectedRoute>} />
        <Route path='/invitations/create' element={<ProtectedRoute allowedRoles={[UserRole.STUDENT]}><InvitationForm /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.STUDENT, UserRole.TEACHER]}><UserList /></ProtectedRoute>} />
        <Route path='/teachers/requests' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}><TeacherRequestList /></ProtectedRoute>} />
        <Route path='/grades' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}><GradeList /></ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminUserList /></ProtectedRoute>} />
        <Route path='/admin/requests' element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminRequestList /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App