// Kullanıcı sipariş state yönetimi (taslak)
export type OrderStage = 'INFO' | 'ORDER_INFO_COLLECTING' | 'PAYMENT' | 'COMPLETE';

const userStates: Record<string, OrderStage> = {};

export function getUserStage(userId: string): OrderStage {
  return userStates[userId] || 'INFO';
}

export function setUserStage(userId: string, stage: OrderStage) {
  userStates[userId] = stage;
}
