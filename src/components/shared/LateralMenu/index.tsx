import Logo from '../Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faUser, faGamepad, faCheckSquare, faLaptop, faTicketAlt, faDollarSign, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styles from '../../../styles/MenuLateral.module.css'

const LateralMenu: React.FC = () => {
  return(
    <div className={styles.background}>
      <Logo />
      <div className={styles.list}>
        <Link href="/admin">
          <a>
            <FontAwesomeIcon icon={faSignal} color="var(--color-gray-light)" className="mr-3" />
            Painel Inicial
            <hr />
          </a>
        </Link>
        <Link href="/admin/users/list">
          <a>
            <FontAwesomeIcon icon={faUser} color="var(--color-gray-light)" className="mr-3" />
            Usuários
            <hr />
          </a>
        </Link>
        <Link href="/admin/products/list">
          <a>
            <FontAwesomeIcon icon={faGamepad} color="var(--color-gray-light)" className="mr-3" />
            Produtos
            <hr />
          </a>
        </Link>
        <Link href="/admin/categories/list">
          <a>
            <FontAwesomeIcon icon={faCheckSquare} color="var(--color-gray-light)" className="mr-3" />
            Categorias
            <hr />
          </a>
        </Link>
        <Link href="/admin/system_requirements/list">
          <a>
            <FontAwesomeIcon icon={faLaptop} color="var(--color-gray-light)" className="mr-3" />
              Requisitos do sistema
              <hr />
          </a>
        </Link>
        <Link href="/admin/coupons/list">
          <a>
            <FontAwesomeIcon icon={faTicketAlt} color="var(--color-gray-light)" className="mr-3" />
            Cupons
            <hr />
          </a>
        </Link>
        <Link href="/admin/#">
          <a>
            <FontAwesomeIcon icon={faDollarSign} color="var(--color-gray-light)" className="mr-3" />
            Financeiro
            <hr />
          </a>
        </Link>
        <Link href="/admin/#">
          <a>
            <FontAwesomeIcon icon={faSignOutAlt} color="var(--color-gray-light)" className="mr-3" />
            Sair
            <hr />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default LateralMenu
