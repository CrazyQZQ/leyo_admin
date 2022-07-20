
import request from '@/utils/request'
import { UserAddress } from '@/types/user'

/**
 * 登录
 * @param params
 * @returns
 */
export const login = (data: any) =>
  request({
    url: '/system/client_login',
    method: 'post',
    data
  })

/**
 * 登出
 * @returns
 */
export const logout = () =>
  request({
    url: '/system/logout',
    method: 'get'
  })

/**
 * 根据id查询
 * @param params
 * @returns
 */
export const getUserInfo = (params: any) =>
  request({
    url: '/system/sysUser/getById',
    method: 'get',
    params
  })

/**
 * 增加用户地址
 * @param params
 * @returns
 */
export const addUserAddress = (data: UserAddress) =>
  request({
    url: '/system/sysUser/addUserAddress',
    method: 'post',
    data
  })

/**
 * 修改用户地址
 * @param params
 * @returns
 */
export const modifyUserAddress = (data: UserAddress) =>
  request({
    url: '/system/sysUser/modifyUserAddress',
    method: 'post',
    data
  })

/**
 * 查询用户地址
 * @param params
 * @returns
 */
export const queryUserAddress = (params: object) =>
  request({
    url: '/system/sysUser/queryUserAddress',
    method: 'get',
    params
  })

/**
 * 根据id查询地址
 * @param params
 * @returns
 */
export const queryAddressById = (params: object) =>
  request({
    url: '/system/sysUser/queryAddressById',
    method: 'get',
    params: params
  })

/**
 * 删除用户地址
 * @param params
 * @returns
 */
export const deleteUserAddress = (params: object) =>
  request({
    url: '/system/sysUser/deleteUserAddress',
    method: 'get',
    params: params
  })
