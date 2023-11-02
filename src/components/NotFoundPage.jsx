import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page-not-found">
      <div className="message-wrapper">
        <h1>
          4<span>0</span>4
        </h1>
        <p>SORRY, THERE'S <br /><span>NOTHING HERE</span></p>
        <button className="home-btn"><Link to="/" >Go home</Link></button>
      </div>
    </div>
  );
}

export default NotFoundPage;
