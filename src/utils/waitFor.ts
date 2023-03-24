export const waitFor = (condition: () => boolean, cb: () => void) => {
	if (condition()) {
		cb();
	} else {
		setTimeout(() => waitFor(condition, cb), 1);
	}
};
