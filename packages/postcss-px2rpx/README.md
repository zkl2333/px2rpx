# `postcss`

> TODO: description

## Usage
```bash
npm i postcss postcss-px2rpx-plugin
```

```javascript
import postcss from 'postcss';
import postcssPx2rpxPlugin from 'postcss-px2rpx-plugin';

// scale 非必填 默认值就是 375 / 750
const output = await postcss([postcssPx2rpxPlugin({ scale: 375 / 750 })]).process(css).css;
```
