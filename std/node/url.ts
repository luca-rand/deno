import { ParsedUrlQuery, ParsedUrlQueryInput } from "./querystring.ts";

// Input to `url.format`
export interface UrlObject {
  auth?: string | null;
  hash?: string | null;
  host?: string | null;
  hostname?: string | null;
  href?: string | null;
  pathname?: string | null;
  protocol?: string | null;
  search?: string | null;
  slashes?: boolean | null;
  port?: string | number | null;
  query?: string | null | ParsedUrlQueryInput;
}

// Output of `url.parse`
export interface Url {
  auth: string | null;
  hash: string | null;
  host: string | null;
  hostname: string | null;
  href: string;
  path: string | null;
  pathname: string | null;
  protocol: string | null;
  search: string | null;
  slashes: boolean | null;
  port: string | null;
  query: string | null | ParsedUrlQuery;
}

export interface UrlWithParsedQuery extends Url {
  query: ParsedUrlQuery;
}

export interface UrlWithStringQuery extends Url {
  query: string | null;
}

export function parse(urlStr: string): UrlWithStringQuery;
export function parse(
  urlStr: string,
  parseQueryString: false | undefined,
  slashesDenoteHost?: boolean
): UrlWithStringQuery;
export function parse(
  urlStr: string,
  parseQueryString: true,
  slashesDenoteHost?: boolean
): UrlWithParsedQuery;
export function parse(
  urlStr: string,
  parseQueryString: boolean,
  slashesDenoteHost?: boolean
): Url {}+

export function format(URL: URL, options?: URLFormatOptions): string;
export function format(urlObject: UrlObject | string): string {}
export function resolve(from: string, to: string): string {}

export function domainToASCII(domain: string): string {}
export function domainToUnicode(domain: string): string {}

/**
 * This function ensures the correct decodings of percent-encoded characters as
 * well as ensuring a cross-platform valid absolute path string.
 * @param url The file URL string or URL object to convert to a path.
 */
export function fileURLToPath(url: string | URL): string {}

/**
 * This function ensures that path is resolved absolutely, and that the URL
 * control characters are correctly encoded when converting into a File URL.
 * @param url The path to convert to a File URL.
 */
export function pathToFileURL(url: string): URL {}

export interface URLFormatOptions {
  auth?: boolean;
  fragment?: boolean;
  search?: boolean;
  unicode?: boolean;
}

export const URL = window.URL;
export const URLSearchParams = window.URLSearchParams;
