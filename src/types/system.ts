// 账户
export interface Account {
    accountId: number
    accountCode: number
    accountName: string
    amount: number
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
}

// 地区
export interface AreaInfo {
    id: number
    parentId: number
    code: string
    name: string
    level: number
}

// 品牌
export interface Brand {
    id: number
    parentId: number
    name: string
    typeId: number
    orderNum: number
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
    imageUrls: string[]
}

// 部门
export interface Dept {
    deptId: number
    parentId: number
    ancestors: string
    deptName: string
    orderNum: number
    leader: string
    phone: string
    email: string
    status: string
    delFlag: string
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
}

// 菜单
export interface Menu {
    menuId: number
    menuName: string
    parentId: number
    orderNum: number
    path: string
    component: string
    query: string
    isFrame: number
    isCache: number
    menuType: string
    visible: string
    status: string
    perms: string
    icon: string
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
    remark: string
}
