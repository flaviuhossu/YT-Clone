import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../../redux/actions/auth.action'
import './_loginScreen.scss'

const LoginScreen = () => {
  const dispatch = useDispatch((state) => state.auth.accessToken)

  // READ DATA FROM REDUX STORE
  const accessToken = useSelector((state) => state.auth.accessToken)

  const handleLogin = () => {
    dispatch(login())
  }

  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      //If the accessToken is not null, redirect the user to homepage
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <div className='login'>
      <div className='login__container'>
        <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt='' />
        <button onClick={handleLogin}>Log in With Google</button>
        <p>This project is made using Youtube Data API</p>
      </div>
    </div>
  )
}

export default LoginScreen
