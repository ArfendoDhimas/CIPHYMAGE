$('#input-jckey-file').on('change', function (files) {
	$('#input-passphrase-group').hide();
	$('#form-decrypt-group').hide();
	var file = files.target.files[0];
	if (file == null) {
		return;
	}
	if (file.name.split('.').slice(-1)[0] == 'jckey')  {
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(e) {
			jckey = JSON.parse(e.target.result);
			console.log(jckey);
			if (jckey.timestamp != null) {
				timestamp = jckey.timestamp
				$('#input-mode-decrypt').val('AES-'+jckey.mode.toUpperCase());
				$('#input-key-decrypt').val(jckey.key);
				$('#input-iv-decrypt').val(jckey.iv);
				if (jckey.mode.toUpperCase() == 'CBC') {
					$('#input-iv-group').show();
				} else {
					$('#input-iv-group').hide();
				}
				$('#form-decrypt-group').show();
			} else {
				$('#input-passphrase-group').show();
			}
		}
	}

});

$('#btn-passphrase-process').on('click', function () {
	var passphrase = $('#input-passphrase-decrypt').val();
	var aes = new AES('ecb',passphrase);
	var decipher_jckey = aes.decrypt(jckey);
	var temp = JSON.parse(decipher_jckey);
	if (temp.timestamp != null) {
		jckey = temp;
		console.log(jckey);
		$('#input-mode-decrypt').val('AES-'+jckey.mode.toUpperCase());
		$('#input-key-decrypt').val(jckey.key);
		$('#input-iv-decrypt').val(jckey.iv);
		$('#form-decrypt-group').show();
	} else {
		console.log('Wrong Passphrase');
	}
});

$('#btn-decrypt').on('click', function () {
	$('.sidebar').removeClass('active');
	$('.panel-loading').addClass('active');
	setTimeout(function(){ 
		var mode = $('#input-mode-decrypt').val().split('-')[1];
		var key = $('#input-key-decrypt').val();
		var iv = $('#input-iv-decrypt').val();
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
		for(var i in jckey.blocks) {
			var block = jckey.blocks[i];
			var x = block.x1, y = block.y1;
			var w = block.x2-block.x1, h = block.y2-block.y1;
			if (w == 0 || h == 0) {
				continue;
			}
			var block_image_data = result_ctx.getImageData(x,y,w,h);
			var decipher_r = aes.decrypt([getChannel(0,block_image_data)]);
			console.log(decipher_r);
			progress += 5;
			updateProgressBar(progress);
			var decipher_g = aes.decrypt([getChannel(1,block_image_data)]);
			progress += 5;
			updateProgressBar(progress);
			var decipher_b = aes.decrypt([getChannel(2,block_image_data)]);
			progress += 5;
			updateProgressBar(progress);
			rebuildImageData(block_image_data, decipher_r[0], decipher_g[0], decipher_b[0]);
			result_ctx.putImageData(block_image_data,x,y);
			progress += 5;
			updateProgressBar(progress);
		}
		result_image = $('#result-image');
		result_image.attr('src', result_canvas.toDataURL());
		// END Encrypt Image

		$('.panel-loading').removeClass('active');
		$('#btn-sidebar').removeClass('active');
		$('.panel-result').addClass('active');
		$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
	}, 1000);
});