let varArr = [
	"e",
	"t",
	"r",
	"y",
	"u",
	"i",
	"o",
	"p",
	"a",
	"s",
	"d",
	"f",
	"g",
	"h",
	"j",
	"k",
	"l",
	"z",
	"x",
	"c",
	"v",
	"b",
	"n",
	"m",
];
let unwantedVarArr = [
	"constructor",
	"valueOf",
	"toString",
	"toLocaleString",
	"isPrototypeOf",
	"propertyIsEnumerable",
	"hasOwnProperty",
	"__defineGetter__",
	"__defineSetter__",
	"__lookupGetter__",
	"__lookupSetter__",
	"__proto__",

	// already typed stuff
	"m_CMInterface",
	"CMInterface",
];
function toJsonSafe(obj, seen = new WeakSet()) {
	if (typeof obj === "bigint") {
		return obj.toString();
	}

	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	if (seen.has(obj)) {
		return;
	}

	if (Array.isArray(obj)) {
		const firstElemType = obj.length > 0 ? typeOf(obj[0]) : "any";
		return `${firstElemType}[]`;
	}

	seen.add(obj);

	let safeObj = {};
	const processProps = (objectToProcess) => {
		const keys = Object.getOwnPropertyNames(objectToProcess);
		for (const key of keys) {
			try {
				if (unwantedVarArr.includes(key)) {
					continue;
				}
				const value = objectToProcess[key];

				if (value?._keysAtom) {
					safeObj[key] = `ObservableMap`;
					continue;
				}

				const discriptor = Object.getOwnPropertyDescriptor(
					objectToProcess,
					key
				);
				if (discriptor?.get) {
					safeObj[`removeThisMate123213${key}`] = `get ${key}(): ${typeOf(
						value,
						seen
					)}`;
				}

				if (typeof value === "function") {
					// if (value.length === 0) {
					// 	let type

					// 	try {
					// 		type = typeOf(value.call(objectToProcess), seen);
					// 	} catch (error) {
					// 		console.error(`Error calling function "${key}": ${error}`)
					// 	}
					// 	if (type) {
					// 		safeObj[key] = `() => ${type}`;
					// 	} else {
					// 		const bru = new Array(value.length).fill(undefined).map((_, i) => varArr[i] + ": any").join(', ');
					// 		safeObj[key] = `(${bru}) => any`;
					// 	}
					// }
					const bru = new Array(value.length)
						.fill(undefined)
						.map((_, i) => varArr[i] + ": any")
						.join(", ");
					safeObj[key] = `(${bru}) => any`;
				} else if (typeof value === "bigint") {
					safeObj[key] = `${value.toString()}n`;
				} else if (typeof value === "string") {
					safeObj[key] =
						value.length === 0
							? "string"
							: value.length > 1000
							? value.slice(0, 1000) + "..."
							: value;
				} else if (!discriptor?.get) {
					safeObj[key] = toJsonSafe(value, seen);
				}
			} catch (error) {
				console.error(`Error accessing property "${key}": ${error}`);
				safeObj[key] = "";
			}
		}
	};

	// Process own properties
	processProps(obj);

	// Process prototype properties
	const proto = Object.getPrototypeOf(obj);
	if (
		proto &&
		proto !== Object.prototype &&
		proto !== Set.prototype &&
		proto !== Map.prototype &&
		proto !== Promise.prototype &&
		!seen.has(proto)
	) {
		console.log("proto = ", proto);
		processProps(proto);
	}

	return safeObj;
}

function typeOf(variable, seen = new WeakSet()) {
	const type = typeof variable;
	if (Array.isArray(variable)) {
		const firstElemType =
			variable.length > 0 ? typeOf(variable[0], seen) : "any";
		return `${firstElemType}[]`;
	} else if (type === "object") {
		if (variable === null) {
			return "null";
		}
		// If we've seen this object before, return immediately to avoid infinite loop.
		if (seen.has(variable)) {
			return "any";
		}
		// Add this object to the seen set.
		seen.add(variable);
		// create an object type representation
		if (variable && type === "object") {
			const props = Object.keys(variable).map((key) => {
				const propType = typeOf(variable[key], seen);
				if (Object.getOwnPropertyDescriptor(variable, key)?.get) {
					return `get ${key}(): ${propType}`;
				} else {
					return `${key}: ${propType}`;
				}
			});
			return `{${props.join("; ")}}`;
		}
		return "any";
	}
	return type;
}

let res = "";
let generatedInterfaces = new Set();

function toInterface(obj, name = "MyInterface") {
	const safeObj = toJsonSafe(obj);

	if (safeObj == null || Object.keys(safeObj).length === 0) {
		return "";
	}

	const interfaceLines = Object.entries(safeObj).map(([key, value]) => {
		const propName = key.replace(/^removeThisMate123213/, "");

		// If value is an object representation, create a nested interface for it.
		let propType = value;
		if (typeof value === "object" && !Array.isArray(value)) {
			const nestedInterfaceName = `${name}${capitalizeFirstLetter(key)}`;
			propType = nestedInterfaceName;

			if (!generatedInterfaces.has(nestedInterfaceName)) {
				generatedInterfaces.add(nestedInterfaceName);
				res += toInterface(value, nestedInterfaceName);
			}
		} else if (
			typeof value === "string" &&
			value.startsWith("{") &&
			value.endsWith("}")
		) {
			// If value is a string representation of an object type, remove quotes around it.
			propType = value.slice(1, -1);
		}
		if (key.includes("m_strIPCountry")) {
			console.log(
				"propType = ",
				propType,
				"value = ",
				value,
				"key = ",
				key,
				"typeof value = ",
				typeof value
			);
		}
		const shouldShowPropName = !(
			typeof propType === "string" && propType.startsWith("get ")
		);
		return `${shouldShowPropName ? propName + ": " : ""}${propType};`;
	});

	return (res += `\n\n\ninterface ${name} {\n    ${interfaceLines.join(
		"\n    "
	)}\n}`);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// vscode search and repalce regexs

// removeThisMate123213.*: "(.+)"
// $1

// (.*): "(\{.+\}.+)"
// $1: $2
