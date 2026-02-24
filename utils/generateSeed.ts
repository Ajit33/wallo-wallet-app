import * as bip39 from 'bip39';
function generateSeed(length: number): string {
    const phrase=bip39.generateMnemonic(length);
    return phrase;  
}
export default generateSeed;