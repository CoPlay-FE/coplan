export interface UpdateProfileRequest {
  nickname: string
  profileImageUrl: string | null
}

export interface UploadProfileImageResponse {
  profileImageUrl: string
}
