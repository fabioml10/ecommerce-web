import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import useSwr from 'swr'
import DashboardTopProductsService from '../../../services/dashboardTopProducts'
import { toast } from 'react-toastify'
import styles from './styles.module.css'

const DashboardTopProducts: React.FC = () => {
  const { data, error } = useSwr(
    '/admin/v1/dashboard/top_five_products', 
    DashboardTopProductsService.index
  )

  if (error) toast.error('Erro ao obter os dados para os top 5 produtos.')

  return (
    <div className={styles.container}>
      <p>Top 5 mais vendidos</p>
      {
        data?.map(
          (product, index) => 
            <div key={index} className={styles.product}>
              <img src={product?.image} alt={product?.product} />
              <div>
                <div>
                  <span>{product?.product}</span>
                </div>
                <div>
                  <span>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    {product?.quantity}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faDollarSign}/>
                    R$ {product?.total_sold}
                  </span>
                </div>
              </div>
            </div>
        )
      }
    </div>
  )
}

export default DashboardTopProducts
