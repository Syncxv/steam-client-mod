export const JSONparse = (str: string, defaultVal: any = {}) => {
	try {
		return JSON.parse(str);
	} catch (err) {
		console.error('failed to parse json', err);
		return defaultVal;
	}
};
