import postcss from 'postcss';
import postcssPx2rpxPlugin from '../packages/postcss-px2rpx/src/index';

const formatOptions = { semi: true };

// 获取 AST
export const getAstClone = (css: string) => {
	const ast = postcss.parse(css).clone();
	return ast;
};

// 格式化
export const formatCss = async (cssString: string): Promise<string> => {
	const prettier = await import('prettier');
	const parserPostcss = await import('prettier/parser-postcss');
	try {
		return prettier.format(cssString, {
			...formatOptions,
			parser: 'css',
			plugins: [parserPostcss]
		});
	} catch (error) {
		console.error(error);
		return error.toString();
	}
};

// 转化
export const px2rpx = async (
	css: string,
	options: { scale: number; ignoreSmallPixels?: boolean; format?: boolean }
): Promise<string> => {
	try {
		const output = await postcss([
			postcssPx2rpxPlugin({
				scale: options.scale,
				ignoreSmallPixels: options.ignoreSmallPixels
			})
		]).process(css).css;
		if (options.format) {
			return await formatCss(output);
		}
		return output;
	} catch (error) {
		console.error(error);
		return error.toString();
	}
};
