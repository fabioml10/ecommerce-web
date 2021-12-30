import { useRouter } from 'next/router'
import MainComponent from '../components/shared/MainComponent'
import { Carousel } from 'react-bootstrap'
import HighlightedProducts from '../components/Storefront/HighlightedProducts'
import useSwr from 'swr'
import HomeService from '../services/home'
import { toast } from 'react-toastify'
import styles from './styles.module.css'

const Storefront: React.FC = () => {
  const router = useRouter()
  const { data, error } = useSwr('/storefront/v1/home', HomeService.index)
  const { featured, last_releases, cheapest } = {...data }

  if (error) toast.error('Erro ao obter dados da home!')

  return (
    <MainComponent>
      <Carousel className={styles.carousel}>
      {
        featured?.slice(0, 3)?.map(
          product => (
            <Carousel.Item key={product.id}>
              <img
                className={`d-block w-100 ${styles.carousel_image}`}
                src={product.image_url}
                alt={product.name}
              />
            </Carousel.Item>
          )
        )
      }
      </Carousel>
      <HighlightedProducts 
        title="Ofertas da Semana" 
        type="highlighted" 
        products={cheapest}
        handleSeeMore={
          () => router.push({
            pathname: '/search',
            query: {
              order: 'price',
              direction: 'asc'
            }
          })
        }
      />

      <HighlightedProducts 
        title="Lançamentos" 
        products={last_releases}
        handleSeeMore={
          () => router.push({
            pathname: '/search',
            query: {
              order: 'release_date',
              direction: 'desc'
            }
          })
        }
      />

      <HighlightedProducts 
        title="Mais Populares" 
        products={featured}
        handleSeeMore={
          () => router.push({
            pathname: '/search',
          })
        }
      />
    </MainComponent>
  )
}

export default Storefront
