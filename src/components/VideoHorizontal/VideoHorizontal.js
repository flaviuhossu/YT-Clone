import React, { useEffect, useState } from 'react'
import './_videoHorizontal.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import moment from 'moment'

import numeral from 'numeral'
import { AiFillEye } from 'react-icons/ai'
import request from '../../api'
import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router'

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video

  const [views, setViews] = useState(0)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null)
  const isVideo = !(id.kind === 'youtube#channel' || subScreen)

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: id.videoId,
        },
      })
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    get_video_details()
  }, [id])

  // Channel ICON
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
      console.log('ChannelId', channelId)
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    if (isVideo) get_channel_icon()
  }, [channelId, isVideo])

  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')
  const history = useHistory()

  // "?." este optional chaining in cazul in care resourceId este undefined
  const _channelId = resourceId?.channelId || channelId

  //↓send current id to the watch url
  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`)
  }
  const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'

  return (
    <Row
      className='videoHorizontal m-1 py-2 align-items-center'
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className='videoHorizontal__left'
      >
        <LazyLoadImage
          src={medium.url}
          effect='blur'
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          wrapperClassName='videoHorizontal__thumbnail-wrapper'
        />
        {isVideo && (
          <span className='videoHorizontal__duration'>{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className='videoHorizontal__right p-0'
      >
        <p className='videoHorizontal__title mb-1'>{title}</p>
        {isVideo && (
          <div className='videoHorizontal__details'>
            <AiFillEye /> {numeral(views).format('0.a')} views •&nbsp;
            {moment(publishedAt).fromNow()}
          </div>
        )}
        {(searchScreen || subScreen) && (
          <p className='mt-1 videoHorizontal__desc'>{description}</p>
        )}
        <div
          className='videoHorizontal__channel
        d-flex align-items-center my-1'
        >
          {isVideo && (
            <LazyLoadImage
              src={channelIcon?.url}
              effect='blur'
              className='videoHorizontal_thumbnail'
              wrapperClassName='videoHorizontal_thumbnail-wrapper'
            />
          )}
          <p className='mb-0'>{channelTitle}</p>
        </div>
        {subScreen && <p>{video.contentDetails.totalItemCount} Videos</p>}
      </Col>
    </Row>
  )
}

export default VideoHorizontal
