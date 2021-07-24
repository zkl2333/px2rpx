import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	alias: {
		prettier: 'https://esm.sh/prettier'
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
					antd: ['antd']
				}
			}
		}
	},
	plugins: [
		reactRefresh(),
		vitePluginImp({
			libList: [
				{
					libName: 'antd',
					style: name => `antd/lib/${name}/style/index.less`
				}
			]
		})
	],
	css: {
		preprocessorOptions: {
			less: {
				// 支持内联 JavaScript
				javascriptEnabled: true
			}
		}
	}
});
