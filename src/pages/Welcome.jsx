import "../css/Welcome.css";

function Welcome() {
  return (
    <>
      <div className="hero">
        <img
          src="../../images/library_hero.png"
          alt=""
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Library Management System</h1>
          <p>
            The Library Management System is a modern web application designed
            to assist library staff in effectively managing books, publishers,
            customers, categories, and authors. With its user-friendly interface
            and powerful CRUD operations, library personnel can easily add new
            books, update existing ones, and swiftly handle user requests.
          </p>
        </div>
      </div>
    </>
  );
}
export default Welcome;
