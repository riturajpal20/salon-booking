import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import BookSlot from "./pages/BookingPage";     
import PaymentPage from "./pages/PaymentPage"; 
import ViewBooking from "./pages/ViewBooking";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/services" />} />

          {/* Public Pages */}
          <Route path="/services" element={<Services user={user} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />

          {/* Protected Pages */}
          <Route path="/admin" element={<RequireLogin user={user}><AdminPanel user={user} /></RequireLogin>} />
          <Route path="/book/:id" element={<RequireLogin user={user}><BookSlot user={user} /></RequireLogin>} />
          <Route path="/payment" element={<RequireLogin user={user}><PaymentPage user={user} /></RequireLogin>} />
          <Route path="/viewslot" element={<RequireLogin user={user}><ViewBooking user={user} /></RequireLogin>} />
          
           {/* <Route
            path="/viewslot/:id"
            element={
              <RequireLogin user={user}>
                <ViewBooking user={user} />
              </RequireLogin>
            }
          /> */}


          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

// Wrapper to enforce login
function RequireLogin({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default App;
