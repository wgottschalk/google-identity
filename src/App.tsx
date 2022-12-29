
type AppProps = {
  email: string
}

function App({email}: AppProps) {

  return (
    <div className="App">
     Now logged in as {email}
    </div>
  )
}

export default App
