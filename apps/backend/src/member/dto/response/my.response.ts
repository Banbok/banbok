import { MemberMyResponseDto as IMemberMyResponseDto } from '@banbok/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../schema';

export class MyResponse implements IMemberMyResponseDto {
  @ApiProperty({
    example: 1,
    description: '회원 고유 ID',
  })
  readonly id: number;

  @ApiProperty({
    example: 'example@naver.com',
    description: '회원 이메일',
  })
  readonly email: string;

  @ApiProperty({
    example: '홍길동',
    description: '회원 이름',
  })
  readonly name: string;

  @ApiProperty({
    example: 'google',
    description: '회원 소셜 로그인 제공자',
  })
  readonly provider: string;

  @ApiProperty({
    example: '1234567890',
    description: '회원 소셜 로그인 제공자 ID',
  })
  readonly providerId: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '회원 프로필 이미지 URL',
    nullable: true,
  })
  readonly profileImage: string | null;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: '회원 가입일',
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: '회원 정보 수정일',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    example: false,
    description: '회원 삭제 여부',
  })
  readonly deleted: boolean;

  static from(member: typeof Member.$inferSelect): MyResponse {
    const response = new MyResponse();
    Object.assign(response, {
      id: member.id,
      email: member.email,
      name: member.name,
      provider: member.provider,
      providerId: member.providerId,
      profileImage: member.profileImage,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      deleted: member.deleted ?? false,
    });
    return response;
  }
}
