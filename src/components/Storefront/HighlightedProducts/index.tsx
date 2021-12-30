import { Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import ProductInfo from '../../shared/ProductInfo'
import ProductHome from '../../../dtos/ProductHome'
import styles from './styles.module.css'

interface HighlightedProductsProps {
  title: string
  type?: string
  products: ProductHome[]
}

const HighlightedProducts: React.FC<HighlightedProductsProps> = ({ title, type, products }) => {
  return (
    <div className={styles.products}>
      <Row className={styles.products_header}>
        <h5>{title}</h5>
        <hr className={styles.line} />
        <Link href="#">
          <a>
          <Button 
            className={
              `${type === 'highlighted' ? styles.highlighted_button : styles.normal_button}`
            }
          >
            Ver mais
          </Button>
          </a>
        </Link>
      </Row>
      <Row>
        {
          products?.map(
            product => (
              <Col md={3} key={product.id}>
                  <ProductInfo
                    type={type} 
                    product={product}
                  />
              </Col>
            )
          )
        }
      </Row>
    </div>
  )
}

export default HighlightedProducts
