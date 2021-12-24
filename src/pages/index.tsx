import Router, { useRouter } from 'next/router'
import MainComponent from "../components/shared/MainComponent"

const Home: React.FC = () => {
  const router = useRouter()

  return (
    <MainComponent>
      <button onClick={() => router.push('/auth/login')}>Login</button>
    </MainComponent>
  )
}

export default Home
