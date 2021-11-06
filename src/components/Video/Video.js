import React, { useEffect, useState } from 'react'
import './_video.scss'

import { AiFillEye } from 'react-icons/ai'
import request from '../../api'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import moment from 'moment'

import numeral from 'numeral'
import { useHistory } from 'react-router'

const Video = ({ video, channelScreen }) => {
  // Destructuring props
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video

  //For the duration we need to use useEffect. Response data is not consistent
  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null)

  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')

  // When searching by category, the ID from data is now an object because of bad API
  const _videoId = id?.videoId || contentDetails?.videoId || id

  // Video details
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: _videoId,
        },
      })
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    get_video_details()
    return () => {}
  }, [_videoId])

  // Channel Icon. Because you don't get it from the useEffect above meh
  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_icon()
  }, [channelId])

  const history = useHistory()

  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`)
  }
  return (
    <div className='video' onClick={handleVideoClick}>
      <div className='video__top'>
        <LazyLoadImage src={medium.url} effect='blur' />
        <span className='video__top__duration'>{_duration}</span>
      </div>
      <div className='video__title'>{title}</div>
      <div className='video__details'>
        <span>
          <AiFillEye /> {numeral(views).format('0.a')} views •&nbsp;
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className='video__channel'>
          <LazyLoadImage src={channelIcon?.url} effect='blur' />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  )
}

export default Video
