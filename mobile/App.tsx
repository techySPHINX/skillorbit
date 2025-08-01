// App.tsx

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { socketService } from './src/services/socketService';
import { notificationService } from './src/services/notificationService';
import { Provider } from 'react-redux';
import { store, RootState } from './src/redux';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

const Root = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Initialize notification service
    notificationService; // Constructor handles configuration

    if (isAuthenticated) {
      socketService.connect();
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated]);

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};
};

export default App;