import csstree from 'css-tree';
import { format } from 'prettier';
import parserPostcss from 'prettier/parser-postcss';

const formatOptions = { semi: true, useTabs: true };

export const getAstClone = (css: string) => {
	const ast = csstree.parse(css);
	return csstree.clone(ast);
};

export const formatCss = (cssString: string): string => {
	try {
		return format(cssString, {
			...formatOptions,
			parser: 'css',
			plugins: [parserPostcss]
		});
	} catch (error) {
		return error.toString();
	}
};

export const px2rpx = (css: string, options: { scale: number; format?: boolean }) => {
	try {
		const astClone = getAstClone(css);
		csstree.walk(astClone, function (node) {
			if (node.type === 'Dimension' && node.unit === 'px') {
				node.value = Number((Number(node.value) * options.scale).toFixed(3)).toString();
				node.unit = 'rpx';
			}
		});
		const output = csstree.generate(astClone);
		if (options.format) {
			return formatCss(output);
		}
		return output;
	} catch (error) {
		return error.toString();
	}
};
