import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

type TokenResponse = google.accounts.oauth2.TokenResponse

function fetchAccessToken(email?: string): Promise<TokenResponse> {
  return new Promise((resolve) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: "456020475075-osesicmio8bh9id9mmhakm4o9ip24hem.apps.googleusercontent.com",
      scope: 'email openid profile',
      callback: (response) => {
        resolve(response)
      }
    })

    // client.requestAccessToken({ hint: email, prompt: '' })
    client.requestAccessToken({ hint: email, prompt: 'none' })
  })
}

function fetchUserProfile(accessToken: string) {
  return fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
    .then(res => res.json())
}

const interval = 1000 * 5 // 5 seconds

async function login() {
  const response = await fetchAccessToken() // normally we obtain the email from Google IAP
  console.log({ response });

  const profile = await fetchUserProfile(response.access_token);
  console.log({ profile })

  setInterval(async () => {
    console.log('refreshing access token')
    const result = await fetchAccessToken(profile.email);
    console.log({ result })
  }, interval)
  return profile;
}

login()
.then((profile) => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App email={profile.email} />
    </React.StrictMode>,
  )
})


