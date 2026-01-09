import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import LandingPage from './pages/LandingPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientList from './pages/doctor/PatientList';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientMedications from './pages/patient/PatientMedications';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import PatientMessages from './pages/patient/PatientMessages';
import DoctorInbox from './pages/doctor/DoctorInbox';
import PatientProfile from './pages/patient/PatientProfile';
import DoctorProfile from './pages/doctor/DoctorProfile';
import NotificationsPage from './pages/common/NotificationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/medications" element={<PatientMedications />} />
        <Route path="/patient/messages" element={<PatientMessages />} />
        <Route path="/patient/profile" element={<PatientProfile />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<PatientList />} />
        <Route path="/doctor/schedule" element={<DoctorSchedule />} />
        <Route path="/doctor/messages" element={<DoctorInbox />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />

        {/* Common Routes */}
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Helper redirection for generic settings to profile */}
        <Route path="/settings" element={<Navigate to="/patient/profile" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
