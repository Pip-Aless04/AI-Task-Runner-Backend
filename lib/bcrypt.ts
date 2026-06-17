import {hash, compare} from 'bcrypt'

const SALT_ROUND = 10

export const encryptionPlugin = {

    hash: async(text: string): Promise<string> => await hash(text, SALT_ROUND),
    
    compare: async(text:string, encryptedText: string): Promise<boolean> => await compare(text, encryptedText)
}
