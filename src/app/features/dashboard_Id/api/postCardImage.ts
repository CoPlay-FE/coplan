import authHttpClient from '@api/axios'

// ✅ 카드 이미지 파일 업로드 시 - 카드 생성 요청에(post) 전달 가능한 형태의 데이터로, 응답 받아서 사용할 예정
export async function postCardImages(
  columnId: number,
  file: File,
): Promise<{ imageUrl: string }> {
  const formData = new FormData()
  formData.append('image', file)
  const res = await authHttpClient.post(
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
