import React, { useEffect, useState } from 'react'
import './_comments.scss'
import Comment from '../Comment/Comment'
import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  getCommentsOFVideoById,
} from '../../redux/actions/comments.action'
const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch()

  const { photoURL } = useSelector((state) => state.auth?.user)

  useEffect(() => {
    dispatch(getCommentsOFVideoById(videoId))
  }, [videoId, dispatch])

  const comments = useSelector((state) => state.commentList.comments)

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  )

  const [text, setText] = useState('')

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(videoId, text))
    if (text.length === 0) return
  }
  return (
    <div className='comments'>
      <p>{totalComments}</p>
      <div className='comments__form d-flex w-100 my-2'>
        <img src={photoURL} alt='' className='rounded-circle mr-3' />
        <form action='' className='d-flex flex-grow-1' onSubmit={handleComment}>
          <input
            type='text'
            className='flex-grow-1 
            mx-2'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Write a comment'
          />
          <button className='border-0 p-2'>Comment</button>
        </form>
      </div>
      <div className='comments__list'>
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Comments
