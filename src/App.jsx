import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';

// Customer Pages
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { ExploreIndia } from './pages/ExploreIndia';
import { ExploreWorld } from './pages/ExploreWorld';
import { Itineraries } from './pages/Itineraries';
import { Experiences } from './pages/Experiences';
import { ExperienceDetail } from './pages/ExperienceDetail';
import { About } from './pages/About';
import { PlanMyTrip } from './pages/PlanMyTrip';
import { Wishlist } from './pages/Wishlist';
import { Search } from './pages/Search';
import { BookingFlow } from './pages/BookingFlow';
import { BookingConfirmation } from './pages/BookingConfirmation';

// Auth Pages
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { CustomerProfile } from './pages/CustomerProfile';
import { CustomerRequestDetail } from './pages/CustomerRequestDetail';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminTripRequests } from './pages/admin/AdminTripRequests';
import { AdminRequestDetail } from './pages/admin/AdminRequestDetail';
import { AdminQuotationBuilder } from './pages/admin/AdminQuotationBuilder';
import { AdminItineraryBuilder } from './pages/admin/AdminItineraryBuilder';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminDestinations } from './pages/admin/AdminDestinations';
import { AdminHeroSlider } from './pages/admin/AdminHeroSlider';

// Scroll to top component on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper to conditionally render main header/footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Navigate to="/explore-india" replace />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/explore-india" element={<ExploreIndia />} />
          <Route path="/explore-world" element={<ExploreWorld />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:id" element={<ExperienceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/plan-my-trip" element={<PlanMyTrip />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/booking/:tripId" element={<BookingFlow />} />
          <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />

          {/* Customer Auth & Account Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/account" element={<CustomerDashboard />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/account/profile" element={<CustomerProfile />} />
          <Route path="/account/requests" element={<CustomerDashboard />} />
          <Route path="/account/requests/:id" element={<CustomerRequestDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="requests" element={<AdminTripRequests />} />
            <Route path="requests/:id" element={<AdminRequestDetail />} />
            <Route path="quotations" element={<AdminQuotationBuilder />} />
            <Route path="itineraries" element={<AdminItineraryBuilder />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="customers/:id" element={<AdminCustomers />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="hero" element={<AdminHeroSlider />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminRoute && <WhatsAppWidget />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <TravelProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </TravelProvider>
  );
}

