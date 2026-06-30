import { RevokeTokenRepository } from "./revokeToken.repository.ts";

export class RevokeTokenService {

    static async addRevokeToken(token: string): Promise<boolean> {
        return await RevokeTokenRepository.addRevokeToken(token);
    }

    static async isTokenRevoked(token: string): Promise<boolean> {
        return await RevokeTokenRepository.isTokenRevoked(token);
    }

}