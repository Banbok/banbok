export interface MyInfoResponseDto {
  readonly id: number;
  readonly email: string;
  readonly name: string;
  readonly provider: string;
  readonly providerId: string;
  readonly profileImage: string | null;
}
