import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './style/common.style.css';
import AppLayout from './Layout/AppLayout';
import AppRouter from './routes/AppRouter';
import GlobalStyle from './utils/GlobalStyle';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useGetUserInfoQuery } from './api/hooks/SignApi';
import { userInfoAtom } from './utils/store';

function App() {
  return (
    <div>
      <AppLayout>
        <GlobalStyle />
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;
