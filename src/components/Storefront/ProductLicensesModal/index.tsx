import { Modal, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import Game from '../../../dtos/Game'
import styles from './styles.module.css'

interface ProductLicensesModal {
  show: boolean;
  onHide: () => void
  selectedProduct?: Game
}

const ProductLicensesModal: React.FC<ProductLicensesModal> = ({show, onHide, selectedProduct}) => {
  return (
    <Modal 
      show={show}
      onHide={onHide}
      size="lg"
      centered
      dialogClassName={styles.modal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedProduct?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <strong>Chaves de Ativação</strong>
            {
              selectedProduct?.licenses.map(
                (license, index) => 
                  <InputGroup className="mb-2" key={index}>
                    <InputGroup>
                      <InputGroup.Text className={styles.key_input}>
                        <FontAwesomeIcon icon={faKey} />
                      </InputGroup.Text>
                    </InputGroup>

                    <FormControl 
                      placeholder="Chave" 
                      className={styles.key_input} 
                      defaultValue={license}
                      disabled
                    />
                  </InputGroup>
              )
            }
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductLicensesModal
