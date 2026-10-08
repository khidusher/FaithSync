import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LandingView } from './LandingView';
import { LoginView } from './LoginView';
import { SignUpView } from './SignUpView';
import { ForgotPasswordView } from './ForgotPasswordView';
import { AuthView } from '../../types';

export const AuthFlow: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('landing');

  switch (currentView) {
    case 'signup':
      return (
        <SignUpView
          onSwitchToLogin={() => setCurrentView('login')}
          onBack={() => setCurrentView('landing')}
        />
      );

    case 'login':
      return (
        <LoginView
          onSwitchToSignUp={() => setCurrentView('signup')}
          onForgotPassword={() => setCurrentView('forgot-password')}
          onBack={() => setCurrentView('landing')}
        />
      );

    case 'forgot-password':
      return (
        <ForgotPasswordView
          onBackToLogin={() => setCurrentView('login')}
        />
      );

    case 'landing':
    default:
      return (
        <LandingView
          onGetStarted={() => setCurrentView('signup')}
          onSignIn={() => setCurrentView('login')}
        />
      );
  }
};
