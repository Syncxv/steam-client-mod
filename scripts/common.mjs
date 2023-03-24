import { transform } from 'esbuild';
import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';
import ts from 'typescript';
export const globPlugins = {
	name: 'glob-plugins',
	setup: build => {
		build.onResolve({ filter: /^plugins$/ }, args => {
			return {
				namespace: 'import-plugins',
				path: args.path
			};
		});

		build.onLoad({ filter: /^plugins$/, namespace: 'import-plugins' }, async () => {
			const dir = 'plugins';
			let code = '';
			let plugins = '\n';
			let i = 0;
			if (!existsSync(`./src/${dir}`))
				return {
					contents: 'export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}',
					resolveDir: './src'
				};

			const files = await readdir(`./src/${dir}`);
			for (const file of files) {
				if (!(await shouldIncludeFile(build, dir, file)))
					continue;
				const mod = `p${i}`;
				code += `import ${mod} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
				plugins += `[${mod}.name]:${mod},\n`;
				i++;
			}
			code += `export default {${plugins}};`;

			return {
				contents: code,
				resolveDir: './src'
			};
		});
	}
};

export const globThemes = {
	name: 'glob-themes',
	setup: build => {
		build.onResolve({ filter: /^themes$/ }, args => {
			return {
				namespace: 'import-themes',
				path: args.path
			};
		});

		build.onLoad({ filter: /^themes$/, namespace: 'import-themes' }, async e => {
			const dir = 'themes';
			let code = '';
			let themes = '\n';
			let i = 0;
			if (!existsSync(`./src/${dir}`))
				return {
					contents: 'export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}',
					resolveDir: './src'
				};
			const files = await readdir(`./src/${dir}`);
			for (const file of files) {
				if (!(await shouldIncludeFile(build, dir, file)))
					continue;
				const them = `p${i}`;
				code += `import ${them} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
				themes += `[${them}.name]:${them},\n`;
				i++;
			}
			code += `export default {${themes}};`;
			return {
				contents: code,
				resolveDir: './src'
			};
		});
	}
};

// ill impove it later ong on me
export const globPatches = {
	name: 'glob-patches',
	setup: build => {
		build.onResolve({ filter: /^patches$/ }, args => {
			return {
				namespace: 'import-patches',
				path: args.path
			};
		});

		build.onLoad({ filter: /^patches$/, namespace: 'import-patches' }, async () => {
			const dir = 'plugins';
			let code = '';
			let patches = '\n';
			let i = 0;
			if (!existsSync(`./src/${dir}`))
				return {
					contents: 'export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}',
					resolveDir: './src'
				};
			const files = await readdir(`./src/${dir}`);
			for (const file of files) {
				if (!(await shouldIncludeFile(build, dir, file)))
					continue;
				const mod = `p${i}`;
				code += `import ${mod} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
				patches += `[${mod}.name]:${mod}.patches,\n`;
				i++;
			}
			code += `export default {${patches}};`;

			return {
				contents: code,
				resolveDir: './src'
			};
		});
	}
};

export const CSSMinifyPlugin = {
	name: 'CSSMinifyPlugin',
	setup(build) {
		build.onLoad({ filter: /\.css$/ }, async args => {
			const f = await readFile(args.path);
			const css = await transform(f, { loader: 'css', minify: true });
			return { loader: 'text', contents: css.code };
		});
	}
};

const shouldIncludeFile = async (build, dir, file) => {
	if(file === "index.ts") return false;
	let filePath = file.endsWith('.ts') || file.endsWith('.tsx') ? file : `${file}/index.ts`;
	if (!existsSync(`./src/${dir}/${filePath}`)) filePath += 'x';
	const type = await getType(`./src/${dir}/${filePath}`);
	// console.log('path:', filePath, '\ntype', type)
	if (
	// if we are building for friends or iframe patcher and the file file type is library THEN we can skip this file because it is not needed
		((build.initialOptions.outfile.endsWith('FriendClient.js') ||
			build.initialOptions.outfile.endsWith('iframe-patcher.js')) &&
			type === 'library') ||
		// same thing here but building for library
		((build.initialOptions.outfile.endsWith('LibraryClient.js') ||
			build.initialOptions.outfile.endsWith('library-patcher.js')) &&
			type === 'friend')
	) {
		return false;
	}

	return true;
};

const getType = async file => {
	// default type
	let pluginType = 'all';

	const pluginContent = await readFile(file, 'utf8');

	const sourceFile = ts.createSourceFile('plugin.ts', pluginContent, ts.ScriptTarget.ESNext, true);
	const visit = node => {
		if (
			ts.isExportAssignment(node) &&
			ts.isCallExpression(node.expression) &&
			node.expression.expression
		) {
			const callExpression = node.expression;
			const functionName = callExpression.expression.getText(sourceFile);

			if (functionName === 'definePlugin') {
				const properties = callExpression.arguments[0]?.properties;

				if (properties) {
					const typeProperty = properties.find(
						property =>
							ts.isPropertyAssignment(property) && property.name.getText(sourceFile) === 'type'
					);

					if (typeProperty && ts.isStringLiteral(typeProperty.initializer)) {
						pluginType = typeProperty.initializer.text;
						return;
					}
				}
			}
		}

		ts.forEachChild(node, visit);
	};

	visit(sourceFile);

	return pluginType;
};
