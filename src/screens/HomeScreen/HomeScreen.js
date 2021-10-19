import React, { useEffect } from 'react'
import CategoriesBar from '../../components/CategoriesBar/CategoriesBar'
import Video from '../../components/Video/Video'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  getPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.actions'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import SkeletonVideo from '../../components/Skeletons/SkeletonVideo'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  )

  // ↓Used for Infinite scroll prop
  const fetchData = () => {
    if (activeCategory === 'All') dispatch(getPopularVideos())
    else dispatch(getVideosByCategory(activeCategory))
  }

  return (
    <Container>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className='spinner-border text-danger d-block mx-auto'></div> //from bootstrap
        }
        className='row'
      >
        {!loading
          ? videos.map((video) => (
              <Col lg={3} md={4}>
                <Video video={video} key={Video.id}></Video>
              </Col>
            ))
          : [...Array(20)].map(() => (
              <Col lg={3} md={4}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  )
}

export default HomeScreen
