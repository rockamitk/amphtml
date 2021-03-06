/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AmpA4A} from '../amp-a4a';
import {base64UrlDecodeToBytes} from '../../../../src/utils/base64';

/** @type {string} @private */
export const SIGNATURE_HEADER = 'X-TestSignatureHeader';

/** @type {string} @private */
export const SIZE_HEADER = 'X-CreativeSize';

/** @type {string} @private */
export const TEST_URL = 'http://iframe.localhost:' + location.port +
    '/test/fixtures/served/iframe.html?args';

export class MockA4AImpl extends AmpA4A {
  getAdUrl() {
    return Promise.resolve(TEST_URL);
  }

  updatePriority() {
    // Do nothing.
  }

  extractCreativeAndSignature(responseArrayBuffer, responseHeaders) {
    const sizeArr = responseHeaders.has(SIZE_HEADER) ?
        responseHeaders.get(SIZE_HEADER).split('x') : null;
    const size = sizeArr ? {width: sizeArr[0], height: sizeArr[1]} : null;
    return Promise.resolve({
      creative: responseArrayBuffer,
      signature: responseHeaders.has(SIGNATURE_HEADER) ?
          base64UrlDecodeToBytes(responseHeaders.get(SIGNATURE_HEADER)) : null,
      size,
    });
  }

  getFallback() {
    return null;
  }

  toggleFallback() {
    // Do nothing.
  }

  deferMutate(callback) {
    callback();
  }
}
