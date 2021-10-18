import axios from 'axios'

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyCF170TEysEutewgp_4-4BskJ727a2-waw',
  },
})

export default request
