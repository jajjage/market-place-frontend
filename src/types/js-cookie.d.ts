declare module 'js-cookie' {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }

  interface CookiesStatic {
    get(name: string): string | undefined;
    get(): {[key: string]: string};
    set(name: string, value: string, options?: CookieAttributes): void;
    remove(name: string, options?: CookieAttributes): void;
    withAttributes(attributes: CookieAttributes): CookiesStatic;
    withConverter(converter: {
      read(value: string): string;
      write(value: string): string;
    }): CookiesStatic;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}