import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

export type CommentsProps = {
    id: number,
    author: {
        name: string;
      }
    content: string;
    postId: number;
  }



const Display_comments: React.FC<{props: CommentsProps}> = ({props}) => {
    // const getComments = async () => {
    //     const data = await fetch(`http://localhost:3001//${props.id}`, {
    //       method: 'GET',
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //     console.log(data)
    //     const res = data.json()
    //     return res
    // }
    // const comments = getComments()
    const authorName = props.author ? props.author.name : 'Unknown author'
    return (
        <div>
            <small>By {authorName} </small>
            <ReactMarkdown children={props.content}/>
            <style jsx>{`
              div {
                color: inherit;
                padding: 2rem;
              }
            `}</style>
        </div>
    )
}

export default Display_comments