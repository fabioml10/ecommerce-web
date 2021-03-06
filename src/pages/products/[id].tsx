import { Col, Row, Badge } from 'react-bootstrap'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import MainComponent from '../../components/shared/MainComponent'
import BlueBackground from '../../components/shared/BlueBackground'
import StyledButton from '../../components/shared/StyledButton'
import useSwr from 'swr'
import { useRouter } from 'next/router'
import ProductShowService from '../../services/productShow'
import { toast } from 'react-toastify'
import { format, parseJSON } from 'date-fns'
import ProductShowData from '../../dtos/ProductShowData'
import WishlistService from '../../services/wishlist'
import LoggedService from '../../util/LoggedService'
import { useDispatch } from 'react-redux';
import { addCartProduct } from '../../store/modules/storefront/cartProducts/reducer';
import styles from './styles.module.css'

const Product: React.FC<ProductShowData> = ({ product }) => {
  const router = useRouter()
  const dispatch = useDispatch();

  const { data, error } = useSwr(`/storefront/v1/products/${router?.query?.id}`, ProductShowService.show, { fallbackData: product})
  if (error) toast.error('Erro ao obter o produto')

  const handleWishitem = async (): Promise<void> => {
    if (LoggedService.execute()) {
      try {
        await WishlistService.add(data?.id);
        toast.info('Adicionado a sua lista de desejos!')
      } catch (error) {
        toast.error('Erro ao adicionar a sua lista de desejos!')
        console.log(error)
      }
      return
    }

    router.push({
      pathname: '/auth/login',
      query: {
        callback: router.pathname.replace('[id]', data?.id.toString())
      }
    });
  }

  return (
    <MainComponent>
      <Row className="mt-4 mb-4">
        <Col md={6}>
          <img
            className="w-100"
            src="/product_image.png"
            alt="First slide"
          />

          <div className="mt-3">
            <h6 className={styles.subtitle}>Sobre o Jogo</h6>
            <p>{data?.description}</p>

            <ul className={styles.list}>
              <li>
                <strong>Desenvolvedora:</strong> 
                <span>{data?.developer}</span>
              </li>
              <li>
                <strong>Modo:</strong> 
                <span>{data?.mode}</span>
              </li>
              <li>
                <strong>Status:</strong> 
                <span>{data?.status === 'available' ? 'Dispon??vel' : 'Indispon??vel'}</span>
              </li>
            </ul>
          </div>
        </Col>

        <Col md={6}>
          <BlueBackground>
            <Row className="mb-4">
              <Col>
                <h1 className={styles.title}>{data?.name}</h1>

                <div>
                  {
                    data?.categories?.map(
                      category => 
                        <Badge
                          key={category.id}
                          bg="primary" 
                          className={styles.primary_badge}
                        >
                          {category.name}
                        </Badge>
                    )
                  }
                </div>
              </Col>

              <Col>
                <strong className="float-right">{`R$ ${data?.price}`}</strong>
              </Col>
            </Row>

            <Row className={styles.mb_50}>
              <Col>
                <Badge bg="primary" className={styles.secondary_badge}>LAN??AMENTO</Badge>
                <p>
                  {
                    data?.release_date &&
                    format(parseJSON(data.release_date), 'dd/MM/yyyy')
                  }
                </p>
              </Col>

              <Col>
                <Badge bg="primary" className={styles.secondary_badge}>VENDIDOS</Badge>
                <p>{data?.sells_count}</p>
              </Col>

              <Col>
                <Badge bg="primary" className={styles.secondary_badge}>FAVORITADO</Badge>
                <p>{data?.favorited_count}</p>
              </Col>
            </Row>
            <hr className={styles.line} />
            <Row className="mt-4 text-center">
              <Col>
                <StyledButton
                  icon={faHeart}
                  action={"Favoritar"}
                  type_button="red"
                  className={styles.gray_button}
                  onClick={handleWishitem}
                />
              </Col>

              <Col>
                <StyledButton
                  icon={faCartPlus} 
                  action={"Comprar"} 
                  type_button="blue" 
                  onClick={() => dispatch(addCartProduct(data))}
                />
              </Col>
            </Row>
          </BlueBackground>
          <div className="mt-4">
            <BlueBackground>
              <strong>Requisitos do sistema</strong>
              <div className="mt-3">
                <ul className={styles.list}>
                  <li>
                    <strong>SO:</strong> 
                    <span>{data?.system_requirement?.operational_system}</span>
                  </li>
                  <li>
                    <strong>Armazenamento:</strong> 
                    <span>{data?.system_requirement?.storage}</span>
                  </li>
                  <li>
                    <strong>Processador:</strong> 
                    <span>{data?.system_requirement?.processor}</span>
                  </li>
                  <li>
                    <strong>Mem??ria:</strong> 
                    <span>{data?.system_requirement?.memory}</span>
                  </li>
                  <li>
                    <strong>Placa de V??deo:</strong> 
                    <span>{data?.system_requirement.video_board}</span>
                  </li>
                </ul>
              </div>
            </BlueBackground>
          </div>
        </Col>
      </Row>
    </MainComponent>
  )
}

export async function getServerSideProps({ params }) {
  const product = await ProductShowService.show(`/storefront/v1/products/${params.id}`)
  return { props: { product } }
}

export default Product
