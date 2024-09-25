import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import MainArea from './pages/MainArea';

function App() {
  return (
    <>
      <header>
        <ResponsiveAppBar />
      </header>
      <div className="main-area">
        <MainArea/>
      </div>
    </>
  );
}

export default App
