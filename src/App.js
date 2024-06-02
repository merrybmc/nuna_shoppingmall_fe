import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './style/common.style.css';
import AppLayout from './Layout/AppLayout';
import AppRouter from './routes/AppRouter';
import GlobalStyle from './utils/GlobalStyle';

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
