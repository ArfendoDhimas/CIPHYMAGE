$('#btn-decrypt').on('click', function () {
	$('.sidebar').removeClass('active');
	$('.panel-loading').addClass('active');
	$('.selection-block .tab-content').removeClass('active');
	$('.selection-block .tab-header').removeClass('active');
	setTimeout(function() { 
		var algo = ciphymage_json.algo.toUpperCase();
		var mode = ciphymage_json.mode.toUpperCase();
		var key = ciphymage_json.key;
		var iv = ciphymage_json.iv;
		
		var result_canvas = document.createElement('canvas');
		result_canvas.width = image_w;
		result_canvas.height = image_h;
		var result_ctx = result_canvas.getContext('2d');
		result_ctx.drawImage(source_image[0],0,0,image_w,image_h);
		
		// BEGIN Decrypt Image
		var algo_object;
		if (algo == 'AES') {
			algo_object = new AES(mode,atob(key));
			if (mode == 'CBC') {
				algo_object.setInitialVector(atob(iv));
			}
		}
		for(var i in ciphymage_json.blocks) {
			var block = ciphymage_json.blocks[i];
			var x = block.x1, y = block.y1;
			var w = block.x2 - block.x1, h = block.y2 - block.y1;
			if (w == 0 || h == 0) continue;
			var block_image_data = result_ctx.getImageData(x, y, w, h);
			var decipher_r = algo_object.decrypt([getChannel(0,block_image_data)]);
			var decipher_g = algo_object.decrypt([getChannel(1,block_image_data)]);
			var decipher_b = algo_object.decrypt([getChannel(2,block_image_data)]);
			rebuildBlockImageData(block_image_data,decipher_r[0],decipher_g[0],decipher_b[0]);
			result_ctx.putImageData(block_image_data,x,y);
		}
		// Default to the original image file type for Decrypted Image (*.jpg will be *.jpeg)
		// Default compress ratio is 0.92 for lossy compression file type (*.jpeg)
		result_image.attr('src', result_canvas.toDataURL(ciphymage_json.image.type));
		// END Decrypt Image

		$('.panel-loading').removeClass('active');
		$('#btn-sidebar').removeClass('active');
		$('.header-result-decryption').show();
		$('.panel-result').addClass('active');
		$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
	},1000);
});
$('#import-json-file').on('change', function (files) {
	$('#input-optional-key-group').hide();
	$('#form-decrypt-group').hide();
	var file = files.target.files[0];
	if (file == null) {
		return;
	}
	if (file.type == 'application/json')  {
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(e) {
			ciphymage_json = JSON.parse(e.target.result);
			if (ciphymage_json.timestamp != null) {
				timestamp = ciphymage_json.timestamp;
				console.log(timestamp);
				$('#input-mode-decrypt').val(
					ciphymage_json.algo.toUpperCase()+'-'+ciphymage_json.mode.toUpperCase()
				);
				$('#input-key-decrypt').val(ciphymage_json.key);
				$('#input-iv-decrypt').val(ciphymage_json.iv);
				if (ciphymage_json.mode.toUpperCase() == 'CBC') {
					$('#input-iv-decrypt-group').show();
				} else {
					$('#input-iv-decrypt-group').hide();
				}
				$('#form-decrypt-group').show();
			} else {
				$('#input-optional-key-group').show();
			}
		}
	}
});
$('#input-optional-key-decrypt').on('keydown', function (event) {
	if (event.which == 13) {
		$('#btn-optional-key-process')[0].click();
	}
});
$('#btn-optional-key-process').on('click', function () {
	var optional_key = $('#input-optional-key-decrypt').val();
	if (optional_key != '') {
		optional_key = paddingOptionalKey(optional_key);
	}
	var decipher_json_profile = new AES('ECB',optional_key).decrypt(ciphymage_json);
	var temp;
	try {
		temp = JSON.parse(decipher_json_profile);
	} catch(error) {
		console.error(error);
	}
	if (temp.timestamp != null) {
		ciphymage_json = temp;
		timestamp = ciphymage_json.timestamp;
		$('#input-mode-decrypt').val(
			ciphymage_json.algo.toUpperCase()+'-'+ciphymage_json.mode.toUpperCase()
		);
		$('#input-key-decrypt').val(ciphymage_json.key);
		$('#input-iv-decrypt').val(ciphymage_json.iv);
		if (ciphymage_json.mode == 'CBC') {
			$('#input-iv-decrypt-group').show();
		} else {
			$('#input-iv-decrypt-group').hide();
		}
		$('#form-decrypt-group').show();
	} else {
		console.error('Wrong Passphrase');
	}
});
$('#btn-optional-key-decrypt-eye').on('click', function () {
	if (source_image.attr('src') == '') {
		return;
	}
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('#input-optional-key-decrypt').attr('type','password');
	} else {
		$(this).addClass('active');
		$('#input-optional-key-decrypt').attr('type','text');
	}
});