import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, ScrollRestoration } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Causes from './pages/Causes';
import CauseDetails from './pages/CauseDetails';
import Programs from './pages/Programs';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Gallery from './pages/Gallery';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCauses from './pages/admin/AdminCauses';
import AdminEvents from './pages/admin/AdminEvents';
import AdminGallery from './pages/admin/AdminGallery';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminDonations from './pages/admin/AdminDonations';
import AdminMessages from './pages/admin/AdminMessages';

// Public layout wrapper with Navbar and Footer
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/causes" element={<Causes />} />
              <Route path="/causes/:id" element={<CauseDetails />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin Login (no sidebar) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Routes (with sidebar) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="causes" element={<AdminCauses />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="volunteers" element={<AdminVolunteers />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4 p-8">
                  <h1 className="text-6xl font-extrabold text-slate-300">404</h1>
                  <p className="text-lg font-bold text-slate-700">Page Not Found</p>
                  <a href="/" className="btn-primary py-2.5 px-6 text-sm inline-block">Return Home</a>
                </div>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
