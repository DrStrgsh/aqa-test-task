export type Product = {
  id: number
  name: string
  price: string
  brand: string
  category: {
    usertype: {
      usertype: string
    }
    category: string
  }
}

export type ProductsResponse = {
  responseCode: number
  products: Product[]
}

export type BrandItem = {
  id: number
  brand: string
}

export type BrandsResponse = {
  responseCode: number
  brands: BrandItem[]
}

export type GenericMessageResponse = {
  responseCode: number
  message: string
}

export type SearchProductsResponse = {
  responseCode: number
  products: Product[]
}

export type UserDetailResponse = {
  responseCode: number
  user: {
    id?: number
    name: string
    email: string
    title?: string
    birth_day?: string
    birth_month?: string
    birth_year?: string
    first_name?: string
    last_name?: string
    company?: string
    address1?: string
    address2?: string
    country?: string
    state?: string
    city?: string
    zipcode?: string
  }
}
