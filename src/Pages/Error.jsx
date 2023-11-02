import { useRouteError, Link, useNavigate } from "react-router-dom"
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Uh oh! We’ve got a problem.</h1>
      <p className="error-message">{error.message || error.statusText}</p>
      <div className="flex-md">
        
        <Link
          to="/"
          className="button go-home"
        >
          <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}
export default Error


/*<button
          className="button go-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button> */