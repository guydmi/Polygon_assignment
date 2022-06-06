import React, {useContext} from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router, { useRouter } from 'next/router'
import { PostProps } from '../../components/Post'
import Create_comments from '../../components/Create_comments'
import Display_comments, { CommentsProps } from '../../components/Display_comments'
import {SigninProps} from '../../pages/signin'
import { SigninContext } from '../../pages/signin'

// type Props = {
//   feed: CommentsProps[]
//   post: PostProps
// }

async function publish(id: number): Promise<void> {
  await fetch(`http://localhost:3001/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroy(id: number): Promise<void> {
  await fetch(`http://localhost:3001/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post: React.FC<(PostProps)> = props => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }
  const username = useContext(SigninContext)
  const authorEmail = username
  console.log(authorEmail)
  console.log("coucou")

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <h3> { authorEmail } </h3>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && (
          <button onClick={() => publish(props.id)}>
            Publish
          </button>
        )}
        <button onClick={() => destroy(props.id)}>
          Delete
        </button>
        <Create_comments postId={(props.id)} />
      </div>
      {props?.comments?.length > 0 ? <>
          <div>
            {props.comments.map((props) => <Display_comments key={props.id} props={props}/>)}
          </div>
        </> : <>
        </>}
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/post/${context.params.id}`)
  const data = await res.json()
  return { props: { ...data } }
}

export default Post
