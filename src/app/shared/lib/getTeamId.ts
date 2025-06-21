export function getTeamId(): string {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID
  if (!teamId) {
    throw new Error('NEXT_PUBLIC_TEAM_ID가 환경 변수에 설정되지 않았습니다.')
  }
  return teamId
}
