import api from '@/app/shared/lib/testAxios'

export async function postCardImages(
  columnId: number,
  file: File,
): Promise<{ imageUrl: string }> {
  const formData = new FormData()
  formData.append('image', file)
  const res = await api.post(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/columns/${columnId}/card-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data 방식으로 파일 전송: 모든 문자를 인코딩하지 않음s
      },
    },
  )

  return res.data
}
