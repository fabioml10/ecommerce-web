import { Row, Col, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'

const CartModalItem: React.FC = () => {
  return (
    <div className={styles.container}>
      <Row>
        <Col xs={5}>
          <img src="/assets/product_image.png" alt="Product Image"/>
        </Col>
        <Col xs={7}>
          <p className={styles.name}>
            God of War
          </p>
          <div className={styles.badges_container}>
            <Badge 
              bg="primary"
              className={styles.badge}
            >
              Ação
            </Badge>
          </div>
          <div className={styles.price_container}>
            <span>R$ 299,99</span>
            <FontAwesomeIcon icon={faTrash}/>
          </div>

        </Col>
      </Row>
    </div>
  )
}

export default CartModalItem
