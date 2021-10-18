import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from '../../components/Comments/Comments'
import VideoHorizontal from '../../components/VideoHorizontal/VideoHorizontal'
import VideoMetaData from '../../components/VideoMetaData/VideoMetaData'
import {
  getRelatedVideos,
  getVideoById,
} from '../../redux/actions/videos.actions'
import './_watchScreen.scss'
const WatchScreen = () => {
  let { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideoById(id))
    dispatch(getRelatedVideos(id))
  }, [dispatch, id])

  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  )

  const { video, loading } = useSelector((state) => state.selectedVideo)

  return (
    <Row>
      <Col lg={8}>
        <div className='watchscreen__player'>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet?.title}
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading...</h6>
        )}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!loading ? (
          videos
            ?.filter((video) => video.snippet) //some videos do not have the snippet. We check for those with the filter
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
            <Skeleton width='100%' height='130px' count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  )
}

export default WatchScreen
