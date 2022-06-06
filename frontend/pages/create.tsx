import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [validUser, setValidUser] = useState(false)

  // const getauthorEmail =async () => {
  //   const data = await fetch(`http://localhost:3001/signin`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //   console.log(data)
  //   return data
  // }
  // const authorEmail = getauthorEmail()

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, authorEmail }
      await fetch(`http://localhost:3001/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }
  const change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(e.target.value)
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
    <Layout>
      <div>
        <form
          onSubmit={submitData}>
          <h1>Create Draft</h1>
          <input
            autoFocus
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={change}
            placeholder="Author (email address)"
            type="text"
            value={authorEmail}
          />
          <textarea
            cols={50}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input
            disabled={!content || !title || !validUser}
            type="submit"
            value="Create"
          />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
          <a className="back" href="/signup" onClick={() => Router.push('/')}>
            Unknown User. If you do not have an account, you can sign up here!
        </a>
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
    </Layout>
  )
}

export default Draft
