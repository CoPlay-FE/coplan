export interface UpdateProfileRequest {
  nickname: string
  profileImageUrl: string | null
}

export interface UploadProfileImageResponse {
  profileImageUrl: string
}

export interface PasswordChangeRequest {
  password: string
  newPassword: string
}
