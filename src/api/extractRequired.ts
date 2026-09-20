// 스웨거에 응답 스키마가 없어 orval이 void로 생성하는 엔드포인트들의
// 응답에서, 실제로 내려오는 값을 꺼내 쓰기 위한 공용 헬퍼. 값이 없으면
// (필드 누락, 응답 자체가 undefined 등) 명시적으로 에러를 던진다.
export const extractRequired = <T, K extends keyof T>(
  response: T | undefined,
  field: K,
  message: string,
): NonNullable<T[K]> => {
  const value = response?.[field];
  if (!value) {
    throw new Error(message);
  }
  return value as NonNullable<T[K]>;
};
