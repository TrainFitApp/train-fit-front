export class HttpHeader {
	[name: string]: string | string[];

	constructor(key: string, value: string | string[]) {
		this[key] = value;
	}
}

export const HTTP_HEADERS = {
	auth: {
		authorization: {
			id: 'Authorization',
		},
	},
	login: {
		contentType: {
			id: 'Content-Type',
			header: new HttpHeader(
				'Content-Type',
				'application/x-www-form-urlencoded'
			),
		},
		disableBrowserPopup: {
			id: 'X-Requested-With',
			header: new HttpHeader('X-Requested-With', 'XMLHttpRequest'),
		},
	},
} as const;
