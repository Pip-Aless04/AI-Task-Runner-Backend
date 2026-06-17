import "dotenv/config"

export const config = {
    jwtSecret: process.env.JWT_SECRET as string || "My_Secret_Key",
    port: process.env.PORT || 3000
}