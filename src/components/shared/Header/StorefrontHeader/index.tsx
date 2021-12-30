import { useState } from 'react'
import { useRouter } from 'next/router'
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../Logo'
import LoggedService from '../../../../util/LoggedService'
import Badge from '../../Badge'
import CartModal from '../../../Storefront/CartModal'
import { useSelector } from 'react-redux';
import ProductShow from '../../../../dtos/ProductShow';
import styles from './styles.module.css'

const StorefrontHeader: React.FC = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [showCartModal, setShowCartModal] = useState(false)
  const cartProducts: ProductShow[] = useSelector(state => state.cartProducts)

  const handleSearch = (): void => {
    router.push(`
      /search?search=${search}&length=12&page=1&order=price&direction=asc
    `)
  }

  const handleUserRedirect = (): void => {
    router.push(
      LoggedService.execute() ? '/profile' : 'auth/admin'
    );
  }

  return (
    <Row className={styles.background}>
      <Col md={6} className="mt-2">
        <Logo />
      </Col>
      <Col md={6} className="mt-2 text-center">
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
          <InputGroup 
            className={`${router.pathname === '/search' ? styles.hidden: ''}`}>
            <FormControl 
              placeholder="Pesquisar produto" 
              value={search}
              onChange={
                (evt: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(evt.target.value)
              }

              onKeyUp={
                (evt: React.KeyboardEvent<HTMLInputElement>) => {
                  if (evt.key.toLowerCase() === 'enter') {
                    handleSearch();
                  }
                }
              }
            />
            </InputGroup>
          </Col>
          <Col md={6}>
            <Row>
              <Col 
                className={`${router.pathname === '/search' ? styles.hidden: ''}`}>
                <FontAwesomeIcon 
                  icon={faSearch} 
                  color="var(--color-gray-light)" 
                  onClick={handleSearch}
                />
              </Col>
              <Col md={4} xs={4}>
                <FontAwesomeIcon 
                  icon={faShoppingCart} color="var(--color-gray-light)" 
                  onClick={() => setShowCartModal(!showCartModal)}
                />
                {
                  cartProducts?.length > 0 &&
                  <Badge>{cartProducts.length}</Badge>
                }
                {
                  cartProducts?.length > 0 && showCartModal &&
                    <CartModal searchPage={router.pathname === '/Search'}/>
                }
              </Col>
              <Col md={4} xs={4}>
                <FontAwesomeIcon 
                  icon={faUserCircle} 
                  color="var(--color-gray-light)" 
                  onClick={handleUserRedirect}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default StorefrontHeader
