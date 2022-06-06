import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import { createContext } from 'react'

export const SigninContext = createContext(null)

export type SigninProps = {
  userSignin: string;
}

const SignIn: React.FC = (signin: SigninProps) => {

  const [username, setUsername] = useState("");
  const [validUser, setValidUser] = useState(false)
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { username }
      await fetch(`http://localhost:3001/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
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
    <Layout>
      <SigninContext.Provider value={username}>
      <div className="page">
        <form
          onSubmit={submitData}>
          <h1>Signin user</h1>
          <input
            onChange={change}
            placeholder="Email address"
            type="text"
            value={username}
          />
          <input
            disabled={!username || !validUser}
            type="submit"
            value="Signin"
          />
          <p hidden={validUser}>Unknown User</p>
          <a className="back" href="/signup" onClick={() => Router.push('/')}>
            If you do not have an account, you can sign up here!
        </a>
        </form>
      </div>
      <style jsx>{`
      .page {
        background: white;
        padding: 3rem;
        display: flex;
        justify-content: center;
      }

      input[type='text'] {
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
      </SigninContext.Provider>
    </Layout>
  )
}

export default SignIn