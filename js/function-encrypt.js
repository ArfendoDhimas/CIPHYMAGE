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
	if ($(this).val() == 'aes-cbc') {
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
	$('#input-key-encrypt').val(
		btoa(
			getRandomString(
				parseInt($('#input-key-length').val())/8
			)
		)
	);
})
$('#btn-random-iv').on('click', function () {
	$('#input-iv-encrypt').val(
		btoa(
			getRandomString(16)
		)
	);
})
$('#input-passphrase-encrypt').on('keydown', function (event) {
})

$('#btn-encrypt').on('click', function () {
	$('.sidebar').removeClass('active');
	$('.panel-loading').addClass('active');
	setTimeout(function(){ 
		var mode = $('#input-mode-encrypt').val().split('-')[1];
		var key = $('#input-key-encrypt').val();
		var iv = $('#input-iv-encrypt').val();
		var passphrase = $('#input-passphrase-encrypt').val();
		var temp_blocks = [];
		var aes = new AES(mode,atob(key),atob(iv));
		console.log(aes);
		// BEGIN Encrypt Image
		var result_canvas = document.createElement('canvas');
		result_canvas.width = image_w;
		result_canvas.height = image_h;
		var result_ctx = result_canvas.getContext('2d');
		result_ctx.drawImage(source_image[0],0,0,image_w,image_h);
		var progress = 0;
		updateProgressBar(progress);
		for(var i in blocks.data) {
			var block = blocks.data[i];
			var x = block.x1, y = block.y1;
			var w = block.x2-block.x1, h = block.y2-block.y1;
			if (w == 0 || h == 0) {
				continue;
			}
			temp_blocks.push({x1:block.x1, y1:block.y1, x2:block.x2, y2:block.y2});
			var block_image_data = result_ctx.getImageData(x,y,w,h);
			var cipher_r = aes.encrypt([getChannel(0,block_image_data)]);
			progress += 5;
			updateProgressBar(progress);
			var cipher_g = aes.encrypt([getChannel(1,block_image_data)]);
			progress += 5;
			updateProgressBar(progress);
			var cipher_b = aes.encrypt([getChannel(2,block_image_data)]);
			progress += 5;
			updateProgressBar(progress);
			rebuildImageData(block_image_data, cipher_r[0], cipher_g[0], cipher_b[0]);
			result_ctx.putImageData(block_image_data,x,y);
			progress += 5;
			updateProgressBar(progress);
		}
		result_image = $('#result-image');
		result_image.attr('src', result_canvas.toDataURL());
		// END Encrypt Image
		timestamp = new Date().getTime();

		// BEGIN Encrypt JCKEY
		var json_key_profile = {
			timestamp : timestamp,
			mode : mode,
			key : key,
			iv : iv,
			blocks : temp_blocks,
		}
		var string_key_profile = JSON.stringify(json_key_profile);
		if (passphrase != '') {
			aes.setKey(passphrase);
			aes.setMode('ecb');
			jckey = JSON.stringify(aes.encrypt(string_key_profile));
		} else {
			jckey = string_key_profile;
		}
		// END Encrypt JCKEY
		$('.panel-loading').removeClass('active');
		$('#btn-sidebar').removeClass('active');
		$('.panel-result').addClass('active');
		$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
	}, 1000);
});

function rebuildImageData(image_data,r,g,b) {
	var i_r = 0, i_g = 0, i_b = 0;
	for (var i = 0; i < image_data.data.length; i++) {
		if (i % 4 == 0) {
			// Rebuild Red Channel
			image_data.data[i] = r[i_r++];
		} else if (i % 4 == 1) {
			// Rebuild Green Channel
			image_data.data[i] = g[i_g++];
		} else if (i % 4 == 2) {
			// Rebuild Blue Channel
			image_data.data[i] = b[i_b++];
		} 
	}
}
function getChannel(channel,image_data) {
	var result = [];
	if ( channel < 0 && 3 < channel) {
		return result;
	}
	while (channel < image_data.data.length) {
		result.push(image_data.data[channel]);
		channel += 4;
	}
	return result;
}