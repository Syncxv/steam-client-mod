// ill do typings later

export function findInTree(
	tree: any,
	filter: (arg: any) => boolean,
	{ walkable, ignore }: { walkable?: any | null; ignore?: string[]; } = {
		walkable: null,
		ignore: []
	}
): any {
	if (!tree || typeof tree !== 'object') {
		return null;
	}

	if (typeof filter === 'string') {
		// eslint-disable-next-line no-prototype-builtins
		if (tree.hasOwnProperty(filter)) {
			return tree[filter];
		}

		return null;
	} else if (filter(tree)) {
		return tree;
	}

	let returnValue = null;

	if (Array.isArray(tree)) {
		for (const value of tree) {
			returnValue = findInTree(value, filter, {
				walkable,
				ignore
			});

			if (returnValue) {
				return returnValue;
			}
		}
	} else {
		const walkables = !walkable ? Object.keys(tree) : walkable;

		for (const key of walkables) {
			// eslint-disable-next-line no-prototype-builtins
			if (!tree.hasOwnProperty(key) || ignore?.includes(key)) {
				continue;
			}

			returnValue = findInTree(tree[key], filter, {
				walkable,
				ignore
			});

			if (returnValue) {
				return returnValue;
			}
		}
	}

	return returnValue;
}
