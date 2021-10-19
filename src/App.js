import React, { useEffect, useState } from 'react'
import LoginScreen from './screens/loginScreen/LoginScreen'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import 'bootstrap/dist/css/bootstrap.min.css'
import './_app.scss'

import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import WatchScreen from './screens/watchScreen/WatchScreen'
import SearchScreen from './screens/searchScreen/SearchScreen'
import Subscriptions from './screens/subscriptionsScreen/Subscriptions'
import ChannelScreen from './screens/channelScreen/ChannelScreen'

//Functional component
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)

  const handleToggleSidebar = () => toggleSidebar((value) => !value)

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container'>
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className='app__main '>
          {children}
        </Container>
      </div>
    </>
  )
}

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth)

  const history = useHistory()

  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth')
    }
  }, [accessToken, loading, history])

  return (
    <Switch>
      <Route path='/' exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>

      <Route path='/auth'>
        <LoginScreen />
      </Route>

      <Route path='/search/:query'>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path='/watch/:id'>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>

      <Route path='/feed/subscriptions'>
        <Layout>
          <Subscriptions />
        </Layout>
      </Route>
      <Route path='/channel/:channelId'>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>

      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  )
}
export default App
