import { MyInfoResponseDto as IMyInfoResponseDto } from '@banbok/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../schema';

export class MyInfoResponse implements IMyInfoResponseDto {
  private constructor(member: typeof Member.$inferSelect) {
    this.id = member.id;
    this.email = member.email;
    this.name = member.name;
    this.provider = member.provider;
    this.providerId = member.providerId;
    this.profileImage = member.profileImage;
    this.createdAt = member.createdAt.toISOString();
  }

  @ApiProperty({
    example: 1,
    description: '회원 고유 ID',
  })
  id: number;

  @ApiProperty({
    example: 'example@naver.com',
    description: '회원 이메일',
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '회원 이름',
  })
  name: string;

  @ApiProperty({
    example: 'google',
    description: '회원 소셜 로그인 제공자',
  })
  provider: string;

  @ApiProperty({
    example: '1234567890',
    description: '회원 소셜 로그인 제공자 ID',
  })
  providerId: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '회원 프로필 이미지 URL',
    nullable: true,
  })
  profileImage: string | null;

  @ApiProperty({
    example: '2023-10-05T14:48:00.000Z',
    description: '회원 가입 일자',
  })
  createdAt: string;

  static from(member: typeof Member.$inferSelect): MyInfoResponse {
    return new MyInfoResponse(member);
  }
}
