import MainComponent from "../../../components/shared/MainComponent"
import LoginForm from "../../../components/LoginForm"

const Login: React.FC = () => {
  return (
    <MainComponent>
      <div className="p-4 text-center">
        <h2>Entrar</h2>
        <LoginForm titlePhrase="Acessar minha conta" buttonPhrase="ACESSAR" />
      </div>
    </MainComponent>
  )
}

export default Login
