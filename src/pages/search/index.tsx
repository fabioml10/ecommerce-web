import { useState, useEffect } from 'react'
import MainComponent from '../../components/shared/MainComponent'
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ProductInfo from '../../components/shared/ProductInfo'
import useSwr from 'swr'
import { useRouter } from 'next/router'
import SearchService from '../../services/search'
import ProductSearchService from '../../util/ProductSearchService'
import CategoriesService from '../../services/categories'
import { toast } from 'react-toastify'
import Pagination from '../../components/shared/Pagination'
import styles from './styles.module.css'

const defaultUrl = '/storefront/v1/products'

const Search: React.FC = () => {
  const router = useRouter()
  const { 
    search: searchRouter, 
    page, 
    category, 
    price, 
    order: orderRouter, 
    direction 
  } = router.query

  const [search, setSearch] = useState(searchRouter?.toString() || '')
  const [order, setOrder] = useState(() => {
    if (!!orderRouter) {
      return `${orderRouter.toString()}-${router.query.direction.toString()}`
    }

    return 'price-asc'
  })

  const [url, setUrl] = useState(() => (
    defaultUrl +
    ProductSearchService.execute({
      search,
      order: orderRouter,
      direction
    })
  ))

  const { data, error } = useSwr(url, SearchService.execute)

  const { data: categoriesData, error: categoriesError } = 
    useSwr('/storefront/v1/categories?length=999', CategoriesService.index)

    useEffect(() => {
      setUrl (
        defaultUrl +
        ProductSearchService.execute({
          search: searchRouter,
          page,
          category,
          price,
          order: orderRouter,
          direction
        })
      )
    }, [searchRouter, page, category, price, orderRouter, direction])

    useEffect(() => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          order: order.split('-')[0],
          direction: order.split('-')[1]
        }
      })
    }, [order])

    const handleSearch = (): void => {
      router.push(`
        /Search?search=${search}&lentgh=12&page=1&order=price&direction=asc
      `);
    }
  
    if (error) {
      toast.error('Erro ao pesquisar produtos.')
    }
  
    if (categoriesError) {
      toast.error('Error ao obter as categorias.')
    }

  return(
    <MainComponent>
      <div>
        <div className="text-center mt-4">
          <h3 className={styles.title}>
            Resultados da Pesquisa
          </h3>
        </div>

        <Row className="text-center col-md-6 offset-md-3">
          <Col xs={10}>
            <InputGroup>
              <FormControl 
                placeholder="Pesquisar" 
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

          <Col xs={2}>
            <FontAwesomeIcon 
              icon={faSearch} 
              size="2x" 
              className={styles.search_icon}
              onClick={handleSearch}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={6} xs={12} className={styles.results}>
            <span>
              {data?.meta?.total} resultado(s)
            </span>
          </Col>

          <Col sm={6} xs={12}>
            <div className={styles.ordenation}>
              <strong className="mr-3">Ordenar por:</strong>
              <select 
                className={styles.secondary}
                value={order}
                onChange={
                  (evt: React.ChangeEvent<HTMLSelectElement>) => 
                    setOrder(evt.target.value)
                }
              >
                <option value="price-asc">Menor pre??o</option>
                <option value="price-desc">Maior pre??o</option>
                <option value="release_date-desc">Lan??amentos</option>
                <option value="release_date-asc">Mais antigos</option>
              </select>
            </div>
          </Col>
        </Row>

        <Row>
          <select 
            className={styles.primary}
            onChange= {
              (evt: React.ChangeEvent<HTMLSelectElement>) =>
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: 1,
                    category: evt.target.value
                  }
                })
            }
          >
            <option value="">Categoria</option>
            {
              categoriesData?.categories?.map(
                category => (
                  <option 
                    value={category.id}
                    key={category.id}
                  >
                    {category.name}
                  </option>
                )
              )
            }
          </select>

          <select className={styles.primary}
            onChange={
              (evt: React.ChangeEvent<HTMLSelectElement>) => 
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: 1,
                    price: evt.target.value
                  }
                })
            }
          >
            <option value="">Pre??o</option>
            <option value="0-50">0 - 50</option>
            <option value="50.01-100">50 - 100</option>
            <option value="100.01-150">100 - 150</option>
            <option value="150.01">+ 150</option>
            </select>
        </Row>

        <Row className="mt-4 mb-4">
          {
            data?.products?.map(
              product => (
                <Col md={3} key={product.id}>
                  <ProductInfo product={product}/>
                </Col>
              )
            )
          }
        </Row>
      </div>

      {
        data?.meta?.total > 0 &&
        <Pagination 
          className={styles.pagination} 
          {...data?.meta} 
        />
      }
    </MainComponent>
  )
}

export default Search
