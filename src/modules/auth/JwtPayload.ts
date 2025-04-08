export interface JwtPayload {
  sub: number; // 用户 ID
  username: string; // 用户名
  // 可拓展更多字段
}
