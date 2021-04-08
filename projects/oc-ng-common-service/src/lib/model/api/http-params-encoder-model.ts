import {HttpParameterCodec, HttpParams} from '@angular/common/http';

export class OcHttpParams extends HttpParams {

  constructor(cloned?: HttpParams) {
    super({
      fromString: cloned?.toString(),
      encoder: OcHttpParamsOptions.instance
    });
  }

  set(key: string, value: string): OcHttpParams {
    if (key && value) {
      return new OcHttpParams(super.set(key, value));
    }
    return this;
  }

  append(key: string, value: string): OcHttpParams {
    if (key && value) {
      return new OcHttpParams(super.append(key, value));
    }
    return this;
  }

  appendRequiredParam(key: string, value: string, defaultValue: string): OcHttpParams {
    return new OcHttpParams(super.append(key, value ? value : defaultValue));
  }
}

export class OcHttpParamsOptions implements HttpParameterCodec {

  static readonly instance = new OcHttpParamsOptions();

  decodeKey(key: string): string {
    if (key) {
      return decodeURIComponent(key);
    }
    return key;
  }

  decodeValue(value: string): string {
    if (value) {
      return decodeURIComponent(value);
    }
    return value;
  }

  encodeKey(key: string): string {
    if (key) {
      return encodeURIComponent(key);
    }
    return key;
  }

  encodeValue(value: string): string {
    if (value) {
      return encodeURIComponent(value);
    }
    return value;
  }
}
