import { InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../Logo'
import Link from 'next/link';
import styles from './styles.module.css'

const StorefrontHeader: React.FC = () => {
  return (
    <Row className={styles.background}>
      <Col md={6} className="mt-2">
        <Logo />
      </Col>
      <Col md={6} className="mt-2 text-center">
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <InputGroup>
              <FormControl placeholder="Pesquisar produto" className={styles.input} />
            </InputGroup>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4} xs={4}>
                <FontAwesomeIcon icon={faSearch} color="var(--color-gray-light)" />
              </Col>
              <Col md={4} xs={4}>
                <FontAwesomeIcon icon={faShoppingCart} color="var(--color-gray-light)" />
              </Col>
              <Col md={4} xs={4}>
              <Link href="/Auth/Login">
                <a>
                  <FontAwesomeIcon icon={faUserCircle} color="var(--color-gray-light)" />
                </a>
              </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default StorefrontHeader
