import api from './api'
import CheckoutData from '../dtos/Checkout'

interface CheckoutResponseData {
  order: {
    id: number
  }
}

const CheckoutService = {
  execute(checkout: CheckoutData) {
    return api.post<CheckoutResponseData>('/storefront/v1/checkouts', checkout)
      .then(resp => resp.data.order)
  }
}

export default CheckoutService
