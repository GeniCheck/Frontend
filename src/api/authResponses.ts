// company/hr 로그인·가입류 엔드포인트가 공통으로 내려주는 응답 모양.
// 스웨거에 스키마가 없어 orval이 void로 생성하므로, 실제 호출부에서
// `as unknown as` 캐스팅 대상으로 쓴다.
export interface TempTokenResponse {
  tempToken: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}
