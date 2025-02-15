import { Navigate } from "react-router-dom";

const ProtectedRoute = ( {children} ) => {
    const isAuth = localStorage.getItem("github_token")
    return isAuth ? children : <Navigate to="/login" replace/>
}

export default ProtectedRoute;