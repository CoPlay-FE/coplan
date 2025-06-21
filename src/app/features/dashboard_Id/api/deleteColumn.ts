import authHttpClient from '@/app/shared/lib/axios'

export async function deleteColumn(columnId: number): Promise<void> {
  await authHttpClient.delete(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/columns/${columnId}`,
  )
}
