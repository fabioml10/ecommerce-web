import Product from '../dtos/Product'

type ProductShow = {
  sells_count: number 
  favorited_count: number
} & Product

export default interface ProductShowData {
  product: ProductShow
}
