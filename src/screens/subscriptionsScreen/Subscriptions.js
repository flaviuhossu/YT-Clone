import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import VideoHorizontal from '../../components/VideoHorizontal/VideoHorizontal'
import { getSubscriptionChannel } from '../../redux/actions/videos.actions'
import './_subscriptions.scss'

const Subscriptions = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSubscriptionChannel())
  }, [dispatch])

  const { loading, videos } = useSelector((state) => state.subscriptionsChannel)
  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id} subScreen />
        ))
      ) : (
        <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
          <Skeleton width='100%' height='160px' count={20} />
        </SkeletonTheme>
      )}
    </Container>
  )
}

export default Subscriptions
