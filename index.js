const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');

const wordList = bip39.wordlists.english;

let address;
let mnemonic;
let seed;
let masterKey;
let firstChild;
//chatgpt yazdı ben değil :D
while (true) {
  mnemonic = bip39.generateMnemonic(256, null, wordList);
  seed = bip39.mnemonicToSeedSync(mnemonic);
  masterKey = bitcoin.bip32.fromSeed(seed);
  firstChild = masterKey.derivePath("m/44'/0'/0'/0/0");
  address = bitcoin.payments.p2pkh({ pubkey: firstChild.publicKey, network: bitcoin.networks.bitcoin }).address;

  const sensitiveWords = [
    '1ALI',
    '1ATA',
    '1BAK',
   //listeyi istediğin gibi uzat knk
  ];

  if (sensitiveWords.some(word => address.includes(word))) {
    console.log('Bulunan cüzdan adresi:', address);
    console.log('Mnemonic Key:', mnemonic);

    const dosyaAdi = `${address}.txt`;
    fs.writeFileSync(dosyaAdi, mnemonic);

  
  }
}
