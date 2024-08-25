import { Base64 } from 'js-base64';
import * as crypto from 'crypto';
import { TripleDES } from './triple-des';
import { InvalidArgumentException } from 'src/shared/exception/exception';

const convertMd5 = (text: string) => {
  return crypto.createHash('md5').update(text).digest('hex');
};

export class Request {
  checksum: string;
  function: string;
  encData: string;
  merchantId: string;
  version: string;
}

export const CommonUtils = {
  createRequest(
    checksum: string,
    func: string,
    merchantId: string,
    version: string,
    mBCRequest: object,
    key: string,
  ) {
    const encData = TripleDES.encrypt(JSON.stringify(mBCRequest), key);
    const checkSumHash = convertMd5(
      func + version + merchantId + encData + checksum,
    );

    const request: Request = {
      checksum: checkSumHash,
      encData,
      function: func,
      merchantId,
      version,
    };

    return JSON.stringify(request);
  },

  encryptData(data: string, pubKey: crypto.KeyObject) {
    try {
      const buffer = Buffer.from(data);
      const keySize = pubKey.asymmetricKeySize;
      const maxLength = keySize - 32;
      const dataLength = buffer.length;
      const iterations = Math.ceil(dataLength / maxLength);
      const encryptedChunks = [];

      for (let i = 0; i < iterations; i++) {
        const chunk = buffer.slice(
          i * maxLength,
          Math.min(dataLength, maxLength * (i + 1)),
        );
        const encrypted = crypto.publicEncrypt(
          { key: pubKey, padding: crypto.constants.RSA_PKCS1_PADDING },
          chunk,
        );
        encryptedChunks.push(encrypted);
      }

      return Base64.encode(Buffer.concat(encryptedChunks).toString('base64'));
    } catch (ex) {
      throw new InvalidArgumentException(ex.toString(), {
        code: 'ENCRYPT_ERROR',
      });
    }
  },

  signData(data: string, privKey: crypto.KeyObject) {
    try {
      const sign = crypto.createSign('SHA256');
      sign.update(data);
      sign.end();
      const signature = sign.sign(privKey);
      return Base64.encode(signature.toString('base64'));
    } catch (ex) {
      throw new InvalidArgumentException(ex.toString(), {
        code: 'SIGN_DATA_ERROR',
      });
    }
  },

  getResponse(encData: string, key: string) {
    return TripleDES.decrypt(encData, key);
  },
};
