import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { Routes } from '@/components/router';

import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Routes />
    </Provider>
  );
}

export default App;
