
import request from '@src/request'

/**
 * 查询banners
 * @returns
 */
export const getBanners = () => {
  return request.get({
    url: '/system/home/banners'
  })
}

/**
 * 获取公告
 * @returns
 */
export const getAnnouncement = () => {
  return request.get({
    url: '/system/home/announcement'
  })
}
