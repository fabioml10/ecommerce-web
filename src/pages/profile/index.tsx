import { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import BlueBackground from '../../components/shared/BlueBackground'
import MainComponent from '../../components/shared/MainComponent'
import Menu from '../../components/Storefront/Menu'
import StyledButton from '../../components/shared/StyledButton'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import withAuth from '../../components/withAuth'
import { useSelector, useDispatch } from 'react-redux'
import User from '../../dtos/User'
import UsersService from '../../services/users'
import { setLoggedUser } from '../../store/modules/auth/reducer'
import { toast } from 'react-toastify'
import styles from './styles.module.css'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  const user: User = useSelector(state => state.auth.loggedUser)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleFormSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()

    try {
      await UsersService.update({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        id: user.id,
        profile: user.profile
      })

      toast.info('Usuário atualizado com sucesso!')
      dispatch(setLoggedUser({name, email, id: user.id, profile: user.profile}))
    } catch (error) {
      toast.error('Erro ao atualizar o usuário, tente novamente.')
    } finally {
      setPassword('')
      setPasswordConfirmation('')
    }
  }

  return (
    <MainComponent>
      <Menu tab="personal_data"/>
      <Form className={styles.form} onSubmit={handleFormSubmit}>
        <BlueBackground>
          <div>
            <strong className="d-block">Leonardo Scorza</strong>
            <span className={styles.blue_text}>
              contato@onebitcode.com
            </span>
          </div>
          <Row className="mt-4">
            <Col xs={12}>
              <div>
                <span className="d-block">
                  Informações Pública
                </span>
                <small className={styles.blue_text}>
                  Essas informações serão exibidas publicamente
                </small>

                <Form.Group className="p-4">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control 
                    placeholder="Nome de exibição" 
                    className={styles.input_background}
                    value={name}
                    onChange={
                      (evt: React.ChangeEvent<HTMLInputElement>) =>
                        setName(evt.target.value)
                    }
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <span className="d-block">
                Informações Pessoais
              </span>
              <small className={styles.blue_text}>
                Essas informações NÃO serão exibidas publicamente
              </small>
              <div className="pl-4 pr-4 pt-3">
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control 
                    placeholder="E-mail" 
                    type="email"
                    className={styles.input_background} 
                    value={email}
                    onChange={
                      (evt: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(evt.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                    placeholder="Repetir Senha" 
                    type="password" 
                    className={styles.input_background} 
                    value={passwordConfirmation}
                    onChange={
                      (evt: React.ChangeEvent<HTMLInputElement>) =>
                        setPasswordConfirmation(evt.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Repetir Senha</Form.Label>
                  <Form.Control placeholder="Repetir Senha" className={styles.input_background} type="password"/>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </BlueBackground>
        <div className="float-right mt-4 mb-4">
          <StyledButton 
            icon={faUser} 
            action="Salvar alterações" 
            type_button="blue" 
            type="submit" 
          />
        </div>
      </Form>
    </MainComponent>
  )
}

export default withAuth(Profile)
