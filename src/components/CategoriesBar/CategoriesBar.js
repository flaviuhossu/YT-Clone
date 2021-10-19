import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.actions'
import './_categoriesBar.scss'

const keywords = [
  'All',
  'React JS',
  'Angular JS',
  'React Native',
  'APIs',
  'Redux',
  'Music',
  'Algorithm',
  'Guitar',
  'Bengali Songs :))',
  'Coding',
  'Cricket',
  'Football',
  'Gatsby',
]

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch()

  const handleClick = (value) => {
    setActiveElement(value)
    if (value === 'All') {
      dispatch(getPopularVideos())
    } else {
      dispatch(getVideosByCategory(value))
    }
  }

  return (
    <div className='categoriesBar'>
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          className={activeElement === value ? 'active' : ''}
          key={i}
        >
          {value}
        </span>
      ))}
    </div>
  )
}

export default CategoriesBar
