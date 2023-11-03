import { useRouteError, Link } from "react-router-dom"

const Error = () => {
  const error = useRouteError();

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