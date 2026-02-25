import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { ethers } from "ethers";

type Wallet = {
  publicKey: string;
  privateKey: string;
};

export function deriveWallets(mnemonic: string, blockchain: string, count: number): Wallet[] {
  const wallets: Wallet[] = [];
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  for (let i = 0; i < count; i++) {
    if (blockchain === "solana") {
     
      const path = `m/44'/501'/${i}'/0'`;
      const derived = derivePath(path, seed.toString("hex"));
      const keypair = Keypair.fromSeed(derived.key);

      wallets.push({
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString("hex"),
      });

    } else if (blockchain === "ethereum") {
      const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
      const path = `m/44'/60'/${i}'/0/0`;
      const wallet = hdNode.derivePath(path);

      wallets.push({
        publicKey: wallet.address,
        privateKey: wallet.privateKey,
      });
    }
  }

  return wallets;
}