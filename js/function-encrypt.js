$('#btn-encrypt').on('click', function () {
	$('.sidebar').removeClass('active');
	$('.panel-loading').addClass('active');
	setTimeout(function(){  
		encryption()
		$('.panel-loading').removeClass('active');
		$('#btn-sidebar').removeClass('active');
		$('.panel-result').addClass('active');
		$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
	}, 1000);
});
function encryption() {
	var result_canvas = document.createElement('canvas');
	result_canvas.width = image_w;
	result_canvas.height = image_h;
	var result_ctx = result_canvas.getContext('2d');
	result_ctx.drawImage(source_image[0],0,0,image_w,image_h);
	var aes = new AES();
	var progress = 0;
	updateProgressBar(progress); 
	for(var i in blocks.data) {
		var x = blocks.data[i].x1, y = blocks.data[i].y1;
		var w = blocks.data[i].x2-blocks.data[i].x1, h = blocks.data[i].y2-blocks.data[i].y1;
		if (w == 0 || h == 0) {
			continue;
		}
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
	$('#result-image').attr('src', result_canvas.toDataURL());
}
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