import './App.css'
import Publisher from './pages/Publisher'
import Category from './pages/Category'
import Author from './pages/Author'
import Book from './pages/Book'
import Borrowing from './pages/Borrowing'
import Welcome from './pages/Welcome'

function App() {
  return (
    <>
    <Welcome/>
    <Publisher/>
    <Category/> 
    <Author/>
    <Book/>
    <Borrowing/>
    </>
  )
}

export default App
