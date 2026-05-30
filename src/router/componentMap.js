import { lazy } from 'react';

const componentMap = {
  'system/user/index': lazy(() => import('@/pages/system/user/User')),
  'system/dept/index': lazy(() => import('@/pages/system/dept/Dept')),
  'system/menu/index': lazy(() => import('@/pages/system/menu/Menu')),
  'system/role/index': lazy(() => import('@/pages/system/role/Role')),
  'system/dict/index': lazy(() => import('@/pages/system/dict/Dict')),
  'system/job/index': lazy(() => import('@/pages/system/job/Job')),
  'mall/unit/index': lazy(() => import('@/pages/mall/Unit')),
  'mall/brand/index': lazy(() => import('@/pages/mall/Brand')),
  'mall/category/index': lazy(() => import('@/pages/mall/Category')),
  'mall/attribute/index': lazy(() => import('@/pages/mall/Attribute')),
  'mall/attributeValue/index': lazy(() => import('@/pages/mall/AttributeValue')),
  'mall/product/index': lazy(() => import('@/pages/mall/Product')),
  'mall/productGroup/index': lazy(() => import('@/pages/mall/ProductGroup')),
  'mall/indexCarouselImage/index': lazy(() => import('@/pages/mall/IndexCarouselImage')),
  'mall/indexProduct/index': lazy(() => import('@/pages/mall/IndexProduct')),
  'mall/indexNotice/index': lazy(() => import('@/pages/mall/IndexNotice')),
  'order/trade/index': lazy(() => import('@/pages/order/Trade')),
  'order/tradeDeliveryAddress/index': lazy(() => import('@/pages/order/TradeDeliveryAddress')),
  'marketing/seckill/index': lazy(() => import('@/pages/marketing/Seckill')),
  'marketing/coupon/index': lazy(() => import('@/pages/marketing/Coupon')),
  'marketing/couponUserProvide/index': lazy(() => import('@/pages/marketing/CouponUserProvide')),
  'marketing/couponUserReceive/index': lazy(() => import('@/pages/marketing/CouponUserReceive')),
  'shopping/shoppingCart/index': lazy(() => import('@/pages/shopping/ShoppingCart')),
  'shopping/productComment/index': lazy(() => import('@/pages/shopping/ProductComment')),
  'shopping/deliveryAddress/index': lazy(() => import('@/pages/shopping/DeliveryAddress')),
  'shopping/productFavorites/index': lazy(() => import('@/pages/shopping/ProductFavorites')),
  'shopping/productViewRecord/index': lazy(() => import('@/pages/shopping/ProductViewRecord')),
  'common/job/index': lazy(() => import('@/pages/common/Job')),
  'common/job/jobLog': lazy(() => import('@/pages/common/JobLog')),
  'common/notify/index': lazy(() => import('@/pages/common/Notify')),
  'common/sensitiveWord/index': lazy(() => import('@/pages/common/SensitiveWord')),
  'common/photo/index': lazy(() => import('@/pages/common/Photo')),
  'common/area/index': lazy(() => import('@/pages/common/Area')),
  'common/smsRecord/index': lazy(() => import('@/pages/common/SmsRecord')),
  'aftersale/refund/index': lazy(() => import('@/pages/aftersale/Refund')),
};

export default componentMap;

export function getPageComponent(componentPath) {
  if (!componentPath) return null;
  const comp = componentMap[componentPath];
  if (!comp) {
    console.warn(`[router] Unknown component path: ${componentPath}`);
    return null;
  }
  return comp;
}
