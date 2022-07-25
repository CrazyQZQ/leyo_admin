export interface SkuAttributes {
    name: string
    value: string
}

export interface AttributeValue {
    id?: number
    name?: string
    attributeId?: null
    checked?: boolean
}

export interface Attribute {
    id: number
    name: string
    values: AttributeValue[]
}

export interface Sku {
    id: number
    productId: number
    spec?: string
    price?: number
    originalPrice?: number
    stock?: number
    sales?: number
    imageUrl: string
    productName?: string
    brandName?: string
    typeName?: string
    skuAttributes?: SkuAttributes[]
}

// 商品
export interface Product {
    id?: number
    code: string
    name: string
    unit?: string
    price?: number
    stock?: number
    createBy?: string
    createTime?: string
    updateBy?: string
    updateTime?: string
    images?: string[]
    imageUrls?: string[]
    typeId: number
    typeName: string
    brandId: number
    brandName: string
    skus?: Sku[]
    attributes?: Attribute[]
}

// 商品品类
export interface ProductType {
    id?: number
    parentId?: number
    name?: string
    orderNum?: number
    createBy?: string
    createTime?: string
    updateBy?: string
    updateTime?: string
    imageUrls?: string[]
}

export interface Brand {
    id: number
    parentId: number
    name: string
    typeId: number
    orderNum?: number
    createBy?: string
    createTime?: string
    updateBy?: string
    updateTime?: null
    imageUrls: string[]
    children?: Brand[]
}

export interface ShoppingCartItem {
    checked: boolean
    id?: number
    num?: number
    skuId?: number
    userId?: number
    sku: Sku
}
