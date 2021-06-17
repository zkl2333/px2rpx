const render = $ => {
	var convertBeforeDom = $('#convert_before');
	var convertDoneDom = $('#convert_done');
	var convertBeforeVal = '';
	var convertDoneVal = '';
	var pxs = [];
	var splitCach = [];
	var errorDom = $('.alert-danger');
	var successDom = $('.alert-success');
	var CSS = $('.cssbeauty');
	$('.convert_btn').click(function () {
		Px2Rpx($(this).attr('data-type'));
	});
	function Px2Rpx(toUnit) {
		convertBeforeVal = convertBeforeDom.val();
		if (toUnit == 'rpx') {
			pxs = convertBeforeVal.match(/[0-9]+([.]{1}[0-9]+){0,1}(?=px)px/g);
		} else {
			pxs = convertBeforeVal.match(/[0-9]+([.]{1}[0-9]+){0,1}(?=rpx)rpx/g);
		}
		convertDoneVal = '';
		if (!pxs) {
			tips(errorDom);
			return;
		}
		for (var i = 0; i < pxs.length; i++) {
			splitCach = convertBeforeVal.split(pxs[i]);
			convertDoneVal += splitCach[0];
			convertDoneVal += getConvertNum(pxs[i], toUnit);
			convertBeforeVal = convertBeforeVal.replace(splitCach[0], '').replace(pxs[i], '');
		}
		for (var i = 0; i < CSS.length; i++) {
			if (CSS[i].checked) {
				var cssFn = CSSBeauty[$(CSS[i]).attr('value')];
				convertDoneDom.val(
					cssFn.apply(null, [
						convertDoneVal + convertBeforeVal,
						$(CSS[i]).attr('data-type')
					])
				);
			}
		}
		if ($('#designWidth').val() == 375) {
			tips(
				successDom,
				'主人，转换任务已经全部达成 :p。再偷偷告诉你，如果设计稿是375px,可以直接1比1写wxss哦~'
			);
		} else {
			tips(successDom, '主人，转换任务已经全部达成 :p');
		}
	}
	function getConvertNum(num, toUnit) {
		num = num.match(/\d+/g)[0];
		dw = $('#designWidth').val();

		if (toUnit == 'rpx') {
			return parseFloat((num * (375 / dw)).toFixed(2)) + 'rpx';
		} else {
			return parseFloat((num * (dw / 375)).toFixed(2)) + 'px';
		}
	}
	function tips(dom, text) {
		dom.stop().fadeIn('200');
		if (text != undefined) {
			dom.html(text);
		}

		setTimeout(function () {
			if (dom.css('display') !== 'none') {
				dom.fadeOut('200');
			}
		}, 2000);
	}

	//格式化样式
	var CSSBeauty = {
		format: function (s, oneline) {
			//格式化
			s = s.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
			s = s.replace(/;\s*;/g, ';'); //清除连续分号
			s = s.replace(/\,[\s\.\#\d]*{/g, '{');
			s = s.replace(/([^\s])\{([^\s])/g, '$1 {\n\t$2');
			s = s.replace(/([^\s])\}([^\n]*)/g, '$1\n}\n$2');
			s = s.replace(/([^\s]);([^\s\}])/g, '$1;\n\t$2');
			if (oneline) {
				s = s.replace(/(\r|\n|\t)/g, '');
				s = s.replace(/(})/g, '$1\r\n');
			}
			return s;
		},
		pack: function (s) {
			//压缩
			s = s.replace(/\/\*(.|\n)*?\*\//g, ''); //删除注释
			s = s.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
			s = s.replace(/\,[\s\.\#\d]*\{/g, '{'); //容错处理
			s = s.replace(/;\s*;/g, ';'); //清除连续分号
			s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
			return s == null ? '' : s[1];
		}
	};
	//console
	console.log(
		'\n%cPx/Rpx互转换工具 \n%cTodo:批量转换',
		"font-family:Consolas,Monaco,'Courier New',Helvetica;font-size:30px;color:#000;line-height:25px;",
		'color:#333;line-height:30px'
	);
	//pageview
	var _hmt = _hmt || [];
	(function () {
		var hm = document.createElement('script');
		hm.src = 'https://hm.baidu.com/hm.js?ad7ab8f27224c9122425846bc2bed779';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(hm, s);
	})();
	return Promise.resolve();
};

(global => {
	global['purehtml'] = {
		bootstrap: () => {
			console.log('purehtml bootstrap');
			return Promise.resolve();
		},
		mount: () => {
			console.log('purehtml mount');
			return render($);
		},
		unmount: () => {
			console.log('purehtml unmount');
			return Promise.resolve();
		}
	};
})(window);
