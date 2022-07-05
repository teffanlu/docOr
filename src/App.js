import './App.css';
import './bootstrap.min.css';
import './components/nav.css';
import './components/login.css';
import './pages/landingPage.css';
import './pages/info.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from './pages/landingPage';
import Home from './pages/home';
import Documentation from './pages/documentation';
import Files from './pages/files';
import Perfil from './pages/perfil';
import ListarEmployee from './pages/listarEmployee';
import ListarAdmin from './pages/listarAdmin';
import EditDocumentation from './pages/editDocumentation';
import EditFiles from './pages/editFies';
import EditHome from './pages/editHome';
import Chat from './pages/chat';
import NotFound from './pages/notFound';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/home" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/files" element={<Files />} />
          <Route path="/listarEmployee" element={<ListarEmployee />} />
          <Route path="/listarAdmin" element={<ListarAdmin />} />
          <Route path="/editDocumentation" element={<EditDocumentation />} />
          <Route path="/editFiles" element={<EditFiles />} />
          <Route path="/editHome" element={<EditHome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;

