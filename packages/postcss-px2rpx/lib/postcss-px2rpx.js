import postcss from 'postcss';

let scale = 375 / 750;

export default postcss.plugin('postcss-px2rpx-plugin', (options = {}) => {
	// Work with options here
	return root => {
		// Transform each rule here
		root.walkDecls(decl => {
			// Transform each property declaration here
			const { value, type, text } = decl;
			if (type === 'comment') {
				scale = text.split(':')[1];
			} else if (value) {
				let reg = /(\d)+(px)/gi;
				let newValue = value.replace(reg, function (s) {
					const number = s.replace(/px/i, '');
					return number * scale + 'rpx';
				});
				decl.value = newValue;
			}
		});
	};
});
