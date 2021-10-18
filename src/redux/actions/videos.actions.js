import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEOS_FAIL,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_FAIL,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTION_CHANNEL_FAIL,
  SUBSCRIPTION_CHANNEL_REQUEST,
  SUBSCRIPTION_CHANNEL_SUCCESS,
} from '../actionType'

import request from '../../api'
// ////MOST POPULAR VIDEOS
export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    })

    const { data } = await request.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'RO',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    })

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: 'All',
      },
    })
  } catch (error) {
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    })
    console.log(error.message)
  }
}
// ////////GET VIDEOS BY CATEGORY
export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    })

    const { data } = await request.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: 'video',
      },
    })

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    })
  } catch (error) {
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    })
    console.log(error.message)
  }
}

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    })

    const { data } = await request('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id,
      },
    })
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    })
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    })
  }
}
export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEOS_REQUEST,
    })

    const { data } = await request('/search', {
      params: {
        part: 'snippet',
        id: id,
        relatedToVideoId: id,
        maxResults: 15,
        type: 'video',
      },
    })
    dispatch({
      type: RELATED_VIDEOS_SUCCESS,
      payload: data.items[0],
    })
  } catch (error) {
    console.log(error.response.data.message) //comming from Axios
    dispatch({
      type: RELATED_VIDEOS_FAIL,
      payload: error.response.data.message,
    })
  }
}
export const getVideosBySearch = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCHED_VIDEOS_REQUEST,
    })

    const { data } = await request.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: keyword,
        type: 'video,channel',
      },
    })

    dispatch({
      type: SEARCHED_VIDEOS_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    dispatch({
      type: SEARCHED_VIDEOS_FAIL,
      payload: error.message,
    })
  }
}
export const getSubscriptionChannel = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CHANNEL_REQUEST,
    })
    const { data } = await request('/subscriptions', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    })
    dispatch({
      type: SUBSCRIPTION_CHANNEL_SUCCESS,
      //if the length is 0, the user is not subscribed
      payload: data.items,
    })
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_CHANNEL_FAIL,
      payload: error.response.data,
    })
  }
}
export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    })
    //1. get upload playlist Id
    const {
      data: { items },
    } = await request('/channels', {
      params: {
        part: 'contentDetails',
        id: id,
      },
    })

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
    //2. get the videos using the id

    const { data } = await request('/channels', {
      params: {
        part: 'contentDetails,snippet',
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    })
    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      //if the length is 0, the user is not subscribed
      payload: data.items,
    })
  } catch (error) {
    console.log(error.response.message)
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.response.data,
    })
  }
}
