import React, { ReactNode, useContext } from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import Layout from './Layout'
import { useState } from 'react'
import { SigninContext } from '../pages/signin'


const Create_comments: React.FC<{ postId: number}> = ({ postId}) => {
    const [content, setContent] = useState('')
    const [username, setUsername] = useState("");
    const [validUser, setValidUser] = useState(false)
    
    // const postId = props.id
    const getauthorEmail =async () => {
        const data = await fetch(`http://localhost:3001/signin`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        console.log(data)
        const email = data.json()
        return email
      }
      // const authorEmail = useContext(SigninContext)
      const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        // const authorEmail = String(getauthorEmail() )
        // console.log(authorEmail)
        try {
          const body = { content, username, postId }
          await fetch(`http://localhost:3001/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          Router.push(`/p/${postId}`)
          setContent("")
        } catch (error) {
          console.error(error)
        }
      }
      const change = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        setValidUser(false)
        try {
          const result = await fetch(`http://localhost:3001/users?email=${e.target.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
          const { userFound } = await result.json()
          console.log(userFound)
          setValidUser(userFound);
        }
        catch (error) {
          console.error(error)
        }
      }
      return (
        <div>
          <div>
            <form
                onSubmit={submitData}>
            <h3>Leave a comment</h3>
            <h1>Signin user</h1>
            <input
              onChange={change}
              placeholder="Email address"
              type="text"
              value={username}
            />
            <textarea
                cols={50}
                onChange={e => setContent(e.target.value)}
                placeholder="Content"
                rows={8}
                value={content}
            />
            <input
                disabled={!content || !validUser}
                type="submit"
                value="Create"
            />

            </form>
          </div>
          <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          height: 6rem;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
        </div>
      )
}

export default Create_comments