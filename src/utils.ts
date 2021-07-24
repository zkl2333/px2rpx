import csstree from 'css-tree';

export const getAstClone = (css: string) => {
	const ast = csstree.parse(css);
	return csstree.clone(ast);
};

export const px2rpx = (css: string, scale: number) => {
	const astClone = getAstClone(css);
	csstree.walk(astClone, function (node) {
		console.log('遍历', node.type, '=>', node);
		if (node.type === 'Dimension' && node.unit === 'px') {
			node.value = Number((Number(node.value) * scale).toFixed(3)).toString();
			node.unit = 'rpx';
		}
	});
	const output = csstree.generate(astClone);
	return output;
};
