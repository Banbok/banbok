import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/service';
import * as schema from '../member/schema/member.schema';

export interface OAuthUserInfo {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  profileImage?: string;
}

export interface AuthResult {
  isNewUser: boolean;
  user: typeof schema.member.$inferSelect;
  accessToken: string;
}

interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateOAuthUser(oauthUserInfo: OAuthUserInfo): Promise<AuthResult> {
    const existingUser = await this.findExistingUser(oauthUserInfo.email);

    if (existingUser) {
      return this.createAuthResultForExistingUser(existingUser);
    }

    return this.createAuthResultForNewUser(oauthUserInfo);
  }

  async findUserByEmail(email: string) {
    const users = await this.memberService.getByEmail(email);
    return users[0] || null;
  }

  private async findExistingUser(email: string) {
    const user = await this.memberService.getByEmail(email);
    return user || null;
  }

  private async createAuthResultForExistingUser(
    user: any,
  ): Promise<AuthResult> {
    const accessToken = this.generateAccessToken(user);

    return {
      isNewUser: false,
      user,
      accessToken,
    };
  }

  private async createAuthResultForNewUser(
    oauthUserInfo: OAuthUserInfo,
  ): Promise<AuthResult> {
    const newUser = await this.createNewUser(oauthUserInfo);
    const accessToken = this.generateAccessToken(newUser);

    return {
      isNewUser: true,
      user: newUser,
      accessToken,
    };
  }

  private async createNewUser(oauthUserInfo: OAuthUserInfo) {
    const newUsers = await this.memberService.create({
      email: oauthUserInfo.email,
      name: oauthUserInfo?.name,
      provider: oauthUserInfo.provider,
      providerId: oauthUserInfo.providerId,
      profileImage: oauthUserInfo?.profileImage,
    });

    return newUsers[0];
  }

  private generateAccessToken(user: typeof schema.member.$inferSelect): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
    };

    return this.jwtService.sign(payload);
  }
}
