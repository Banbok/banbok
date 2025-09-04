import { MyInfoResponseDto as IMyInfoResponseDto } from '@banbok/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../schema';

export class MyInfoResponse implements IMyInfoResponseDto {
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

  static from(member: typeof Member.$inferSelect): MyInfoResponse {
    const response = new MyInfoResponse();
    response.id = member.id;
    response.email = member.email;
    response.name = member.name;
    response.provider = member.provider;
    response.providerId = member.providerId;
    response.profileImage = member.profileImage;
    return response;
  }
}
