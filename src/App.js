import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import JobsDetailsItem from './components/JobsDetailsItem'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobsDetailsItem} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
