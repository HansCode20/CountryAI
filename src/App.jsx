import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CountryList from "./pages/CountryList.jsx"
import client from "./graphql/client"
import { ApolloProvider } from "@apollo/client"
import HandleLogin from "./auth/HandleLogin.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import AuthCallback from "./auth/AuthCallBack.jsx"


function App() {

  return (
    <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/login" element={< HandleLogin/>}/>
            <Route path="/auth/callback" element={<AuthCallback/>}/>
            <Route 
             path="/" 
             element={
              <ProtectedRoute>
                <CountryList/>
              </ProtectedRoute>
             }
            />
          </Routes>
        </Router>
    </ApolloProvider>
  )
}

export default App
