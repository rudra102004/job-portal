import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children, allowedRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("isLoggedIn", "true"); // optional
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const role = userDoc.exists() ? userDoc.data().role : null;

        if (!allowedRole || role === allowedRole) {
          setIsAllowed(true);
        }
      } else {
        localStorage.removeItem("isLoggedIn");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, [allowedRole]);

  if (loading) {
    return <p className="text-center mt-10">Checking access...</p>;
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
