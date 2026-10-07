export class HttpHeader {
	[name: string]: string | string[];

	constructor(key: string, value: string | string[]) {
		this[key] = value;
	}
}
