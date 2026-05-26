import {hash, compare} from 'bcrypt'

export class Bcrypt{

    private static readonly SALT_ROUND = 10

    static hash = async (text: string): Promise<string> => await hash(text, this.SALT_ROUND)

    static compare = async (text: string, compareText: string ): Promise<boolean> => await compare(text, compareText)

}