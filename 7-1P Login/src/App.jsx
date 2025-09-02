import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import HeaderBar from './components/HeaderBar';
import { useEffect, useState } from 'react';
import { getCurrentUserFromStorage, clearCurrentUserFromStorage } from './utils/session';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function App() {
  const [user, setUser] = useState(null);      
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrateAndSet = async (sessionUser) => {
    setUser(sessionUser);
    try {
      const snap = await getDoc(doc(collection(db, 'users'), sessionUser.id));
      setProfile(snap.exists() ? snap.data() : null);
    } catch {
      setProfile(null);
    }
  };

  useEffect(() => {
    (async () => {
      const sessionUser = getCurrentUserFromStorage();
      if (!sessionUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }
      await hydrateAndSet(sessionUser);
      setLoading(false);
    })();
  }, []);

  const logout = () => {
    clearCurrentUserFromStorage();
    setUser(null);
    setProfile(null);
  };

  if (loading) return <p>Loading…</p>;

  return (
    <BrowserRouter>
      <HeaderBar profile={profile} onLogout={logout} />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login onLogin={hydrateAndSet} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup onLogin={hydrateAndSet} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
