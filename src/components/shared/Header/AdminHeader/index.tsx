import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faUser, faGamepad, faCheckSquare, faLaptop, faTicketAlt, faDollarSign, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

interface AdminHeaderProps {
  name: string
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ name }) => {
  const router = useRouter()

  return (
    <Row className={styles.background}>
      <Col lg={6} xs={12} className={styles.menu}>
        <Link href="/admin"><a><FontAwesomeIcon icon={faSignal} color="var(--color-gray-light)" className={`ml-3 ${router.pathname === '/admin' ? styles.active : ''}`} /></a></Link>
        <Link href="/admin/users/list"><a><FontAwesomeIcon icon={faUser} color="var(--color-gray-light)" className={`ml-3 ${router.pathname === '/admin/users/list' ? styles.active : ''}`} /></a></Link>
        <Link href="/admin/products/list"><a><FontAwesomeIcon icon={faGamepad} color="var(--color-gray-light)" className={`ml-3 ${router.pathname === '/admin/products/list' ? styles.active : ''}`} /></a></Link>
        <Link href="/admin/categories/list"><a><FontAwesomeIcon icon={faCheckSquare} color="var(--color-gray-light)" className={`ml-3 ${router.pathname === '/admin/categories/list' ? styles.active : ''}`} /></a></Link>
        <Link href="/admin/system_requirements/list"><a><FontAwesomeIcon icon={faLaptop} color="var(--color-gray-light)" className="ml-3" /></a></Link>
        <Link href="/admin/coupons/list"><a><FontAwesomeIcon icon={faTicketAlt} color="var(--color-gray-light)" className={`ml-3 ${router.pathname === '/Admin/system_requirements/list' ? styles.active : ''}`} /></a></Link>
        <Link href="#"><a><FontAwesomeIcon icon={faDollarSign} color="var(--color-gray-light)" className={`ml-3 ${router.pathname === '/Admin/coupons/list' ? styles.active : ''}`} /></a></Link>
      </Col>

      <Col lg={6} xs={3} className={styles.profile}>
        <div className="float-right">
          <span className={styles.name}>{name}</span>
          <FontAwesomeIcon icon={faUserCircle} color="var(--color-gray-light)" />
        </div>
      </Col>
    </Row>
  )
}

export default AdminHeader
