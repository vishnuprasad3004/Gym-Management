import React, { useState } from 'react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';
import { ViewState, User } from './types';

function App() {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setViewState(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewState(ViewState.LANDING);
  };

  const handleNavigate = (view: ViewState) => {
    setViewState(view);
  };

  return (
    <>
      {viewState === ViewState.LANDING && (
        <Landing onNavigate={handleNavigate} />
      )}

      {viewState === ViewState.LOGIN && (
        <Auth 
          currentView={viewState} 
          onNavigate={handleNavigate} 
          onLogin={handleLogin} 
        />
      )}

      {viewState === ViewState.DASHBOARD && currentUser && (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
