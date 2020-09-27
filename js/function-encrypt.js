$('#btn-encrypt').on('click', function () {
	$('.sidebar').removeClass('active');
	$('.panel-loading').addClass('active');
	setTimeout(function() { 
		var algo = $('#input-mode-encrypt').val().split('-')[0].toUpperCase();
		var mode = $('#input-mode-encrypt').val().split('-')[1].toUpperCase();
		var key = $('#input-key-encrypt').val();
		var iv = $('#input-iv-encrypt').val();
		var optional_key = $('#input-optional-key-encrypt').val();
		if (optional_key != '') {
			optional_key = paddingOptionalKey(optional_key);
		}
		var blocks_profile = [];
		
		var result_canvas = document.createElement('canvas');
		result_canvas.width = image_w;
		result_canvas.height = image_h;
		var result_ctx = result_canvas.getContext('2d');
		result_ctx.drawImage(source_image[0],0,0,image_w,image_h);
		
		// BEGIN Encrypt Image
		var algo_object;
		if (algo == 'AES') {
			algo_object	= new AES(mode,atob(key));
			if (mode == 'CBC') {
				algo_object.setInitialVector(atob(iv));
			}
		}
		for(var i in blocks.data) {
			var block = blocks.data[i];
			var x = block.x1, y = block.y1;
			var w = block.x2 - block.x1, h = block.y2 - block.y1;
			if (w == 0 || h == 0) continue;
			blocks_profile.push({
				x1 : block.x1, y1 : block.y1, x2 : block.x2, y2 : block.y2 
			});
			var block_image_data = result_ctx.getImageData(x, y, w, h);
			var cipher_r = algo_object.encrypt([getChannel(0, block_image_data)]);
			var cipher_g = algo_object.encrypt([getChannel(1, block_image_data)]);
			var cipher_b = algo_object.encrypt([getChannel(2, block_image_data)]);
			rebuildBlockImageData(block_image_data, cipher_r[0], cipher_g[0], cipher_b[0]);
			result_ctx.putImageData(block_image_data, x, y);
		}
		result_image.attr('src', result_canvas.toDataURL());
		// END Encrypt Image

		timestamp = new Date().getTime();

		// BEGIN JCKEY
		var key_profile = {
			timestamp : timestamp,
			algo : algo,
			mode : mode,
			key : key,
			blocks : blocks_profile,
		}
		if (mode == 'CBC') {
			key_profile.iv = iv;
		}
		var string_key_profile = JSON.stringify(key_profile);
		if (optional_key != '') {
			var cipher_key_profile = new AES('ECB',optional_key).encrypt(string_key_profile);
			jckey = JSON.stringify(cipher_key_profile);
		} else {
			jckey = string_key_profile;
		}
		// END JCKEY

		$('.panel-loading').removeClass('active');
		$('#btn-sidebar').removeClass('active');
		$('.header-result-encryption').show();
		$('.panel-result').addClass('active');
		$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
	},1000);
});

$('#input-key-length').on('change', function () {
	$('#input-key-encrypt').val(
		btoa(
			getRandomString(
				parseInt($(this).val())/8
			)
		)
	);
});
$('#input-mode-encrypt').on('change', function () {
	if ($(this).val().toUpperCase() == 'AES-CBC') {
		$('#input-iv-group').show();
		$('#input-iv-encrypt').val(
			btoa(
				getRandomString(16)
			)
		);
	} else {
		$('#input-iv-group').hide();
	}
});
$('#btn-random-key').on('click', function () {
	if (source_image.attr('src') == '') {
		return;
	}
	$('#input-key-encrypt').val(
		btoa(
			getRandomString(
				parseInt($('#input-key-length').val())/8
			)
		)
	);
});
$('#btn-random-iv').on('click', function () {
	if (source_image.attr('src') == '') {
		return;
	}
	$('#input-iv-encrypt').val(
		btoa(
			getRandomString(16)
		)
	);
});
$('#btn-optional-key-encrypt-eye').on('click', function () {
	if (source_image.attr('src') == '') {
		return;
	}
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('#input-optional-key-encrypt').attr('type','password');
	} else {
		$(this).addClass('active');
		$('#input-optional-key-encrypt').attr('type','text');
	}
});