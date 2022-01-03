import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import DashboardSalesRangeService from '../../../services/dashboardSalesRange'
import useSwr from 'swr'
import { toast } from 'react-toastify'
import styles from './styles.module.css'

const DashboardGraphic: React.FC = () => {
  const { data, error } = useSwr('/admin/v1/dashboard/sales_ranges', DashboardSalesRangeService.index)

  if (error) toast.error('Erro ao obter os dados para o gráfico do dashboard.')

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={395}>
        <LineChart width={500} height={400} data={data} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
          <Line type="monotone" dataKey="total_sold" stroke="#7DA1BC" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.1}/>
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} dataKey="total_sold"/>
          <Tooltip
            contentStyle={{
              backgroundColor: '#10163A',
              fontSize: 14
            }}
            formatter={
              (value, name, props) => (  [`R$ ${value.toFixed(2)}`, "Total vendido" ] )
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardGraphic
