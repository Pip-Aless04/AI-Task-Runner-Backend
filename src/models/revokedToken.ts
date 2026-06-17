import { prisma } from "../../lib/prisma.ts";

export class RevokeTokenModel {
    
    static async addRevokeToken(token: string): Promise<void> {
        try {
            await prisma.revokeTokens.create({
                data: { token }
            });
            console.log("Revoked token added successfully");
        } catch (error) {
            console.error("Error adding revoked token:", error);
            throw new Error("Failed to add revoked token");
        }
    }

    static async isTokenRevoked(token: string): Promise<boolean> {
        try {
            const revoked = await prisma.revokeTokens.findUnique({
                where: { token }
            });
            return revoked !== null;
        } catch (error) {
            console.error("Error checking revoked token:", error);
            throw new Error("Failed to check revoked token");
        }
    }

}