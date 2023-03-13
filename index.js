const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');


// yapay zeka yardım ile yazıldı iyi eğlenceler :D
const wordList = bip39.wordlists.english;

let address;
let mnemonic;
let seed;
let masterKey;
let firstChild;


while (true) {
  mnemonic = bip39.generateMnemonic(256, null, wordList);
  seed = bip39.mnemonicToSeedSync(mnemonic);
  masterKey = bitcoin.bip32.fromSeed(seed);
  firstChild = masterKey.derivePath("m/44'/0'/0'/0/0");
  address = bitcoin.payments.p2pkh({ pubkey: firstChild.publicKey, network: bitcoin.networks.bitcoin }).address;


  if (address.includes("1MKA"))  {
    console.log('Bulunan cüzdan adresi: ', address);
    console.log('Mnemonic Key: ', mnemonic);
    let dosyaAdi = address+'.txt';

fs.writeFileSync(dosyaAdi, mnemonic, (err) => {
  if (err) throw err;
  console.log('yazdim knk !');
});

  }
}
