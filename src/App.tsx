import React, { useState } from 'react';
import './App.less';
import { Layout, Input, Switch, Form } from 'antd';
import { getAstClone, px2rpx } from './utils';

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

function App() {
	const [cssSource, setCssSource] = useState('.foo { font-size: 12px }');
	const [showAst, setShowAst] = useState(false);
	const [designWidth, setDesignWidth] = useState(414);

	return (
		<Layout className="fill-screen">
			<Header className="header">px 转 rpx</Header>
			<Content className="content" style={{ padding: '0 50px', marginTop: '30px' }}>
				<div className="setting" style={{ marginBottom: '20px' }}>
					<Form layout="inline">
						<Form.Item label="显示 AST">
							<Switch
								checked={showAst}
								onChange={setShowAst}
								checkedChildren="开启"
								unCheckedChildren="关闭"
							/>
						</Form.Item>

						<Form.Item label="设计稿尺寸">
							<Input
								suffix="px"
								value={designWidth}
								style={{ width: '80px' }}
								onChange={event => setDesignWidth(Number(event.target.value))}
							/>
						</Form.Item>
					</Form>
				</div>
				<div className="content-background">
					<div className="input">
						<h2>输入</h2>
						<TextArea
							className="inner-box"
							value={cssSource}
							onChange={event => setCssSource(event.target.value)}
						/>
					</div>
					{showAst && (
						<div className="ast">
							<h2>AST</h2>
							<pre className="inner-box">
								{JSON.stringify(getAstClone(cssSource), null, 2)}
							</pre>
						</div>
					)}
					<div className="output">
						<h2>输出</h2>
						<pre className="inner-box">
							<code>{px2rpx(cssSource, 750 / designWidth)}</code>
						</pre>
					</div>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>px2rpx ©2021 Created by Zkl2333</Footer>
		</Layout>
	);
}

export default App;
