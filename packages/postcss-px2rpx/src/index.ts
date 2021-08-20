import * as postcss from 'postcss';

let scale = 375 / 750;

const scaleHandler = (number: number, scale: number) => {
	return Number((number * scale).toFixed(3));
};

const plugin = (options: { scale?: number; ignoreSmallPixels?: boolean }): postcss.Plugin => {
	if (options.scale) {
		scale = options.scale;
	}
	return {
		postcssPlugin: 'postcss-typescript-css',
		Comment: comment => {
			const [key, value] = comment.text.split(':');
			if (key.trim() === 'scale') {
				scale = Number(value);
				comment.text = `scale-after : ${scale}`;
			}
		},
		Declaration: decl => {
			const { value } = decl;
			if (value) {
				let reg = /(\d)+(px)/gi;
				let newValue = value.replace(reg, function (s) {
					const number = Number(s.replace(/px/i, ''));
					if (options.ignoreSmallPixels && number <= 1) {
						return number + 'px';
					}
					return scaleHandler(number, scale) + 'rpx';
				});
				decl.value = newValue;
			}
		}
	};
};
plugin.postcss = true;
export default plugin;
