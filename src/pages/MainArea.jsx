import { Routes, Route } from "react-router-dom";
import Publisher from './Publisher'
import Category from './Category'
import Author from './Author'
import Book from './Book'
import Borrowing from './Borrowing'
import Welcome from './Welcome'

function MainArea() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/book" element={<Book />} />
      <Route path="/author" element={<Author />} />
      <Route path="/publisher" element={<Publisher />} />
      <Route path="/category" element={<Category />} />
      <Route path="/borrowing" element={<Borrowing />} />
    </Routes>
  );
}

export default MainArea;