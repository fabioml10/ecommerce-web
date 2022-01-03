import api from './api'

interface SalesRangeItem {
  [key: string]: number
}

interface DashboardSalesRange {
  sales_ranges: SalesRangeItem[]
}

const DashboardSalesRangeService = {
  index(url: string) {
    return api.get<DashboardSalesRange>(url).then(response => response.data.sales_ranges)
  }
}

export default DashboardSalesRangeService
