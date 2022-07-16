
import request from '@src/request'
import { UserAddress } from '@src/models/User'

// }
/**
 * 登录
 * @param params
 * @returns
 */
export const login = (params: any) => {
  return request.post({
    url: '/system/client_login',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 增加用户地址
 * @param params
 * @returns
 */
export const addUserAddress = (params: UserAddress) => {
  return request.put({
    url: '/system/sysUser/addUserAddress',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 修改用户地址
 * @param params
 * @returns
 */
export const modifyUserAddress = (params: UserAddress) => {
  return request.post({
    url: '/system/sysUser/modifyUserAddress',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 查询用户地址
 * @param params
 * @returns
 */
export const queryUserAddress = (params: object) => {
  return request.get({
    url: '/system/sysUser/queryUserAddress',
    params: params
  })
}

/**
 * 根据id查询地址
 * @param params
 * @returns
 */
export const queryAddressById = (params: object) => {
  return request.get({
    url: '/system/sysUser/queryAddressById',
    params: params
  })
}

/**
 * 删除用户地址
 * @param params
 * @returns
 */
export const deleteUserAddress = (params: object) => {
  return request.delete({
    url: '/system/sysUser/deleteUserAddress',
    params: params
  })
}
