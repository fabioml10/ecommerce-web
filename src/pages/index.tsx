import MainComponent from '../components/shared/MainComponent'
import { Carousel } from 'react-bootstrap'
import HighlightedProducts from '../components/Storefront/HighlightedProducts'
import styles from './styles.module.css'

const Storefront: React.FC = () => {
  return (
    <MainComponent>
      <Carousel className={styles.carousel}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="	https://meups.com.br/wp-content/uploads/2018/01/God-of-War-4-900x503.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="	https://meups.com.br/wp-content/uploads/2018/01/God-of-War-4-900x503.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="	https://meups.com.br/wp-content/uploads/2018/01/God-of-War-4-900x503.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <HighlightedProducts title="Ofertas da Semana" type="highlighted" />
      <HighlightedProducts title="Lançamentos" />
      <HighlightedProducts title="Mais Populares" />
    </MainComponent>
  )
}

export default Storefront
