import Router, { useRouter } from 'next/router'
import MainComponent from "../components/shared/MainComponent"

const Home: React.FC = () => {
  const router = useRouter()

  return (
    <MainComponent>
      <h1>Home</h1>
    </MainComponent>
  )
}

export default Home
