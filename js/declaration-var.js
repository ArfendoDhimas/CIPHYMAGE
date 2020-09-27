// BEGIN Declaration Variable
var source_image, image_metadata;
var result_image, ciphymage_json, timestamp;
var image_h, image_w;
// END Declaration Variable

// BEGIN Native Function
function init() {
	source_image = $('#source-image');
	image_metadata = {};
	result_image = $('#result-image');
	ciphymage_json = {};
	timestamp = 0;
	image_h = 0;
	image_w = 0;
	resetAll();
}
function getRandomString(length) {
	var random = '';
	for (var i = 0; i < length; i++) {
		random += String.fromCharCode(Math.floor(Math.random()*256));
	}
	return random;
}
function updateProgressBar(value) {
	// $('.progress-bar').attr('aria-valuenow', value);
	// $('.progress-bar').css('width', value+'%');
	// $('.progress-bar').html(value+'%');
}
function resetAll(){
	resetSelectionBlock();
	setMaxAllBlock(0,0);
	resetSidebar();
	resetPanelEncrypt();
	resetPanelDecrypt();
	resetImage();
}
function resetPanelEncrypt() {
	$('#input-mode-encrypt').val('AES-CBC');
	$('#input-key-length').val('256');
	$('#input-key-encrypt').val(btoa(getRandomString(parseInt($('#input-key-length').val())/8)));
	$('#input-iv-encrypt').val(btoa(getRandomString(16)));
	$('#input-iv-group').show();
	$('#input-optional-key-encrypt').val('');

	$('#input-mode-encrypt').prop('disabled',true);
	$('#input-key-length').prop('disabled',true);
	$('#input-optional-key-encrypt').prop('disabled',true);
	$('#btn-encrypt').prop('disabled',true);
}
function enableFormEncrypt() {
	$('#input-mode-encrypt').prop('disabled',false);
	$('#input-key-length').prop('disabled',false);
	$('#input-optional-key-encrypt').prop('disabled',false);
	$('#btn-encrypt').prop('disabled',false);
}
function resetPanelDecrypt() {
	$('#import-json-file').val('');
	$('#input-optional-key-group').hide();
	$('#input-optional-key-decrypt').val('');
	$('#form-decrypt-group').hide();
	$('#input-key-decrypt').val('');
	$('#input-iv-decrypt').val('');

	$('#import-json-file').prop('disabled',true);
	$('#input-optional-key-decrypt').prop('disabled',true);
	$('#btn-decrypt').prop('disabled',true);
}
function enableFormDecrypt() {
	$('#import-json-file').prop('disabled',false);
	$('#input-optional-key-decrypt').prop('disabled',false);
	$('#btn-decrypt').prop('disabled',false);
}
function setMaxAllBlock(max_x, max_y) {
	$('.input-x').attr('max', max_x);
	$('.input-y').attr('max', max_y);
}
function resetCurrentSelectedBlock() {
	blocks.data[blocks.curr].reset();
}
function resetImage() {
	$('#btn-import-image').val('');
	source_image.attr('src','');
	result_image.attr('src','');
	image_h = 0;
	image_w = 0;
}
function resetSidebar() {
	$('.sidebar').removeClass('active');
	$('#btn-sidebar').removeClass('active');
	$('.tab-header.encryption')[0].click();
}
function resetSelectionBlock() {
	blocks.curr = 0;
	for (var i in blocks.data) {
		blocks.data[i].reset();
	}
	$('.selection-block .tab-content').removeClass('active');
	$('.selection-block .tab-header').removeClass('active');
	$('.selection-block #radio-block-1').prop('checked',true);
	$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
}

function rebuildBlockImageData(image_data, red, green, blue) {
	var r = 0, g = 0, b = 0;
	for (var i = 0; i < image_data.data.length; i++) {
		if (i % 4 == 0) {
			// Rebuild Red Channel
			image_data.data[i] = red[r++];
		} else if (i % 4 == 1) {
			// Rebuild Green Channel
			image_data.data[i] = green[g++];
		} else if (i % 4 == 2) {
			// Rebuild Blue Channel
			image_data.data[i] = blue[b++];
		} 
	}
}
function getChannel(channel,image_data) {
	var result = [];
	// Only use channel 0,1,2 (rgb), channel 3 (alpha) will not use
	if ( channel < 0 && 3 < channel) {
		return result;
	}
	while (channel < image_data.data.length) {
		result.push(image_data.data[channel]);
		channel += 4;
	}
	return result;
}
function paddingOptionalKey(optional_key) {
	var length = 32 - optional_key.length;
	while (optional_key.length < 32) {
		optional_key += String.fromCharCode(length);
	}
	return optional_key;
}
function isSupportedJSON(json_obj) {
	if (json_obj.timestamp == null || json_obj.timestamp == '') {
		// console.log(1);
		return false;
	}
	if (json_obj.image == null || json_obj.image == '') {
		// console.log(2);
		return false;
	}
	if (json_obj.image.name == null || json_obj.image.name == '') {
		// console.log(3);
		return false;
	}
	if (json_obj.image.type == null || json_obj.image.type == '') {
		// console.log(4);
		return false;
	}
	var supported_image_type = ['image/png', 'image/jpeg', 'image/bmp'];
	if (!supported_image_type.includes(json_obj.image.type.toLowerCase())) {
		// console.log(4);
		return false;
	}
	if (json_obj.algo == null || json_obj.algo == '') {
		// console.log(5);
		return false;
	}
	var supported_algo = ['AES']
	if (!supported_algo.includes(json_obj.algo.toUpperCase())) {
		// console.log(6);
		return false;
	}

	if (json_obj.mode == null || json_obj.mode == '') {
		// console.log(7);
		return false;
	}
	var supported_mode = ['ECB', 'CBC'];
	if (!supported_mode.includes(json_obj.mode.toUpperCase())) {
		// console.log(8);
		return false;
	}
	if (json_obj.key == null || json_obj.key == '') {
		// console.log(9);
		return false;
	}
	var supported_key_length = [16, 24, 32];
	if (!supported_key_length.includes(atob(json_obj.key).length)) {
		// console.log(10);
		return false;
	}
	if (json_obj.mode.toUpperCase() == 'CBC') {
		if (json_obj.iv == null || json_obj.iv == '') {
		// console.log(11);
		return false;
		}
		var supported_iv_length = [16];
		if (!supported_iv_length.includes(atob(json_obj.iv).length)) {
		// console.log(12);
		return false;
		}
	}
	if (json_obj.blocks == null || json_obj.blocks == '') {
		// console.log(13);
		return false;
	}
	if (typeof json_obj.blocks == 'object' && json_obj.blocks.length > 0) {
		for (var i in json_obj.blocks) {
			var block = json_obj.blocks[i];
			if (block.x1 < 0 || block.y1 < 0) {
				// console.log(14);
				return false;
			}
			if (block.x2 < block.x1 || block.y2 < block.y1) {
				// console.log(15);
				return false;
			}
		}
	}
	return true;
}

var eventImage = {
	status_draw : false,
	startX : 0, startY : 0, endX : 0, endY : 0,
	mouseDown : function(event) {
		var relativeX = event.clientX - source_image.offset().left;
		var relativeY = event.clientY - source_image.offset().top;
		if (this.status_draw) {
			this.status_draw = false;
		} else {
			this.startX = Math.floor(relativeX * image_w / source_image.width());
			this.startY = Math.floor(relativeY * image_h / source_image.height());
			if (this.startX >= blocks.data[0].x1 && this.startY >= blocks.data[0].y1) {
				if (this.startX <= blocks.data[0].x2 && this.startY <= blocks.data[0].y2) {
					return;
				}
			}
			if (this.endX >= blocks.data[0].x1 && this.endY >= blocks.data[0].y1) {
				if (this.endX <= blocks.data[0].x2 && this.endY <= blocks.data[0].y2) {
					return;
				}
			}
			this.status_draw = true;
			this.endX = this.startX;
			this.endY = this.startY;

			blocks.data[blocks.curr].setX1(this.startX);
			blocks.data[blocks.curr].setY1(this.startY);
			blocks.data[blocks.curr].setX2(this.endX);
			blocks.data[blocks.curr].setY2(this.endY);
		}
	},
	mouseMove : function(event) {
		var relativeX = event.clientX - source_image.offset().left;
		var relativeY = event.clientY - source_image.offset().top;
		this.endX = Math.floor(relativeX * image_w / source_image.width());
		this.endY = Math.floor(relativeY * image_h / source_image.height());
		if (this.status_draw) {
			var tempX1, tempX2, tempY1, tempY2;
			if (this.endX < this.startX) {
				tempX1 = this.endX; tempX2 = this.startX;
			} else {
				tempX1 = this.startX; tempX2 = this.endX;
			}
			if (this.endY < this.startY) {
				tempY1 = this.endY; tempY2 = this.startY;
			} else {
				tempY1 = this.startY; tempY2 = this.endY;
			}
			blocks.data[blocks.curr].setX1(tempX1);
			blocks.data[blocks.curr].setY1(tempY1);
			blocks.data[blocks.curr].setX2(tempX2);
			blocks.data[blocks.curr].setY2(tempY2);
		}
	},
}

var blocks = {
	curr : 0,
	data : [
		// block 1
		{
			x1 : 0, y1 : 0, x2 : 0, y2 : 0,
			setX1 : function(value) {
				var temp = this.x1;
				this.x1 = value;
				if (!blocks.isValidWith(this)) {
					this.x1 = temp;
				}
				if (this.x2 < this.x1) {
					this.x2 = this.x1;
				}
				temp = this.x1 * 100 / image_w;
				$('#block1-x1').val(this.x1);
				$('#rect-block-1').css('left',temp+'%');
				this.setX2(this.x2);
			},
			setY1 : function (value) {
				var temp = this.y1;
				this.y1 = value;
				if (!blocks.isValidWith(this)) {
					this.y1 = temp;
				}
				if (this.y2 < this.y1) {
					this.y2 = this.y1;
				}
				temp = this.y1 * 100 / image_h;
				$('#block1-y1').val(this.y1);
				$('#rect-block-1').css('top',temp+'%');
				this.setY2(this.y2);
			},
			setX2 : function(value) {
				var temp = this.x2;
				this.x2 = value;
				if (!blocks.isValidWith(this)) {
					this.x2 = temp;
				}
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block1-x2').val(this.x2);
				$('#rect-block-1').css('width',temp+'%');
				if (this.x2 < this.x1) {
					this.x1 = this.x2;
					this.setX1(this.x1);
				}
			},
			setY2 : function (value) {
				var temp = this.y2;
				this.y2 = value;
				if (!blocks.isValidWith(this)) {
					this.y2 = temp;
				}
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block1-y2').val(this.y2);
				$('#rect-block-1').css('height',temp+'%');
					if (this.y2 < this.y1) {
						this.y1 = this.y2;
						this.setY1(this.y1);
					}
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 0;
				var temp = this.x1 * 100 / image_w;
				$('#block1-x1').val(this.x1);
				$('#rect-block-1').css('left',temp+'%');
				temp = this.y1 * 100 / image_h;
				$('#block1-y1').val(this.y1);
				$('#rect-block-1').css('top',temp+'%');
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block1-x2').val(this.x2);
				$('#rect-block-1').css('width',temp+'%');
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block1-y2').val(this.y2);
				$('#rect-block-1').css('height',temp+'%');
				eventImage.status_draw = false;
			},
		},
		// block 2
		{
			x1 : 0, y1 : 0, x2 : 0, y2 : 0,
			setX1 : function(value) {
				var temp = this.x1;
				this.x1 = value;
				if (!blocks.isValidWith(this)) {
					this.x1 = temp;
				}
				if (this.x2 < this.x1) {
					this.x2 = this.x1;
				}
				temp = this.x1 * 100 / image_w;
				$('#block2-x1').val(this.x1);
				$('#rect-block-2').css('left',temp+'%');
				this.setX2(this.x2);
			},
			setY1 : function (value) {
				var temp = this.y1;
				this.y1 = value;
				if (!blocks.isValidWith(this)) {
					this.y1 = temp;
				}
				if (this.y2 < this.y1) {
					this.y2 = this.y1;
				}
				temp = this.y1 * 100 / image_h;
				$('#block2-y1').val(this.y1);
				$('#rect-block-2').css('top',temp+'%');
				this.setY2(this.y2);
			},
			setX2 : function(value) {
				var temp = this.x2;
				this.x2 = value;
				if (!blocks.isValidWith(this)) {
					this.x2 = temp;
				}
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block2-x2').val(this.x2);
				$('#rect-block-2').css('width',temp+'%');
				if (this.x2 < this.x1) {
					this.x1 = this.x2;
					this.setX1(this.x1);
				}
			},
			setY2 : function (value) {
				var temp = this.y2;
				this.y2 = value;
				if (!blocks.isValidWith(this)) {
					this.y2 = temp;
				}
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block2-y2').val(this.y2);
				$('#rect-block-2').css('height',temp+'%');
					if (this.y2 < this.y1) {
						this.y1 = this.y2;
						this.setY1(this.y1);
					}
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 0;
				var temp = this.x1 * 100 / image_w;
				$('#block2-x1').val(this.x1);
				$('#rect-block-2').css('left',temp+'%');
				temp = this.y1 * 100 / image_h;
				$('#block2-y1').val(this.y1);
				$('#rect-block-2').css('top',temp+'%');
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block2-x2').val(this.x2);
				$('#rect-block-2').css('width',temp+'%');
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block2-y2').val(this.y2);
				$('#rect-block-2').css('height',temp+'%');
				eventImage.status_draw = false;
			},
		},
		// block 3
		{
			x1 : 0, y1 : 0, x2 : 0, y2 : 0,
			setX1 : function(value) {
				var temp = this.x1;
				this.x1 = value;
				if (!blocks.isValidWith(this)) {
					this.x1 = temp;
				}
				if (this.x2 < this.x1) {
					this.x2 = this.x1;
				}
				temp = this.x1 * 100 / image_w;
				$('#block3-x1').val(this.x1);
				$('#rect-block-3').css('left',temp+'%');
				this.setX2(this.x2);
			},
			setY1 : function (value) {
				var temp = this.y1;
				this.y1 = value;
				if (!blocks.isValidWith(this)) {
					this.y1 = temp;
				}
				if (this.y2 < this.y1) {
					this.y2 = this.y1;
				}
				temp = this.y1 * 100 / image_h;
				$('#block3-y1').val(this.y1);
				$('#rect-block-3').css('top',temp+'%');
				this.setY2(this.y2);
			},
			setX2 : function(value) {
				var temp = this.x2;
				this.x2 = value;
				if (!blocks.isValidWith(this)) {
					this.x2 = temp;
				}
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block3-x2').val(this.x2);
				$('#rect-block-3').css('width',temp+'%');
				if (this.x2 < this.x1) {
					this.x1 = this.x2;
					this.setX1(this.x1);
				}
			},
			setY2 : function (value) {
				var temp = this.y2;
				this.y2 = value;
				if (!blocks.isValidWith(this)) {
					this.y2 = temp;
				}
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block3-y2').val(this.y2);
				$('#rect-block-3').css('height',temp+'%');
					if (this.y2 < this.y1) {
						this.y1 = this.y2;
						this.setY1(this.y1);
					}
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 0;
				var temp = this.x1 * 100 / image_w;
				$('#block3-x1').val(this.x1);
				$('#rect-block-3').css('left',temp+'%');
				temp = this.y1 * 100 / image_h;
				$('#block3-y1').val(this.y1);
				$('#rect-block-3').css('top',temp+'%');
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block3-x2').val(this.x2);
				$('#rect-block-3').css('width',temp+'%');
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block3-y2').val(this.y2);
				$('#rect-block-3').css('height',temp+'%');
				eventImage.status_draw = false;
			},
		},
		// block 4
		{
			x1 : 0, y1 : 0, x2 : 0, y2 : 0,
			setX1 : function(value) {
				var temp = this.x1;
				this.x1 = value;
				if (!blocks.isValidWith(this)) {
					this.x1 = temp;
				}
				if (this.x2 < this.x1) {
					this.x2 = this.x1;
				}
				temp = this.x1 * 100 / image_w;
				$('#block4-x1').val(this.x1);
				$('#rect-block-4').css('left',temp+'%');
				this.setX2(this.x2);
			},
			setY1 : function (value) {
				var temp = this.y1;
				this.y1 = value;
				if (!blocks.isValidWith(this)) {
					this.y1 = temp;
				}
				if (this.y2 < this.y1) {
					this.y2 = this.y1;
				}
				temp = this.y1 * 100 / image_h;
				$('#block4-y1').val(this.y1);
				$('#rect-block-4').css('top',temp+'%');
				this.setY2(this.y2);
			},
			setX2 : function(value) {
				var temp = this.x2;
				this.x2 = value;
				if (!blocks.isValidWith(this)) {
					this.x2 = temp;
				}
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block4-x2').val(this.x2);
				$('#rect-block-4').css('width',temp+'%');
				if (this.x2 < this.x1) {
					this.x1 = this.x2;
					this.setX1(this.x1);
				}
			},
			setY2 : function (value) {
				var temp = this.y2;
				this.y2 = value;
				if (!blocks.isValidWith(this)) {
					this.y2 = temp;
				}
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block4-y2').val(this.y2);
				$('#rect-block-4').css('height',temp+'%');
					if (this.y2 < this.y1) {
						this.y1 = this.y2;
						this.setY1(this.y1);
					}
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 0;
				var temp = this.x1 * 100 / image_w;
				$('#block4-x1').val(this.x1);
				$('#rect-block-4').css('left',temp+'%');
				temp = this.y1 * 100 / image_h;
				$('#block4-y1').val(this.y1);
				$('#rect-block-4').css('top',temp+'%');
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block4-x2').val(this.x2);
				$('#rect-block-4').css('width',temp+'%');
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block4-y2').val(this.y2);
				$('#rect-block-4').css('height',temp+'%');
				eventImage.status_draw = false;
			},
		},
		// block 5
		{
			x1 : 0, y1 : 0, x2 : 0, y2 : 0,
			setX1 : function(value) {
				var temp = this.x1;
				this.x1 = value;
				if (!blocks.isValidWith(this)) {
					this.x1 = temp;
				}
				if (this.x2 < this.x1) {
					this.x2 = this.x1;
				}
				temp = this.x1 * 100 / image_w;
				$('#block5-x1').val(this.x1);
				$('#rect-block-5').css('left',temp+'%');
				this.setX2(this.x2);
			},
			setY1 : function (value) {
				var temp = this.y1;
				this.y1 = value;
				if (!blocks.isValidWith(this)) {
					this.y1 = temp;
				}
				if (this.y2 < this.y1) {
					this.y2 = this.y1;
				}
				temp = this.y1 * 100 / image_h;
				$('#block5-y1').val(this.y1);
				$('#rect-block-5').css('top',temp+'%');
				this.setY2(this.y2);
			},
			setX2 : function(value) {
				var temp = this.x2;
				this.x2 = value;
				if (!blocks.isValidWith(this)) {
					this.x2 = temp;
				}
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block5-x2').val(this.x2);
				$('#rect-block-5').css('width',temp+'%');
				if (this.x2 < this.x1) {
					this.x1 = this.x2;
					this.setX1(this.x1);
				}
			},
			setY2 : function (value) {
				var temp = this.y2;
				this.y2 = value;
				if (!blocks.isValidWith(this)) {
					this.y2 = temp;
				}
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block5-y2').val(this.y2);
				$('#rect-block-5').css('height',temp+'%');
					if (this.y2 < this.y1) {
						this.y1 = this.y2;
						this.setY1(this.y1);
					}
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 0;
				var temp = this.x1 * 100 / image_w;
				$('#block5-x1').val(this.x1);
				$('#rect-block-5').css('left',temp+'%');
				temp = this.y1 * 100 / image_h;
				$('#block5-y1').val(this.y1);
				$('#rect-block-5').css('top',temp+'%');
				temp = (this.x2 - this.x1) * 100 / image_w;
				$('#block5-x2').val(this.x2);
				$('#rect-block-5').css('width',temp+'%');
				temp = (this.y2 - this.y1) * 100 / image_h;
				$('#block5-y2').val(this.y2);
				$('#rect-block-5').css('height',temp+'%');
				eventImage.status_draw = false;
			},
		},
	],
	isValidWith : function(block) {
		var a = block;
		for (var i = 0; i < blocks.data.length; i++) {
			if (blocks.curr == i) {
				continue;
			}
			var b = blocks.data[i];
			if (
				a.x1 < 0 || image_w < a.x1 || a.y1 < 0 || image_h < a.y1 ||
				a.x2 < 0 || image_w < a.x2 || a.y2 < 0 || image_h < a.y2
			) {
				// console.log(1)
				return false;
			}
			if (
				(a.x1 > b.x1 && a.y1 > b.y1) && (a.x1 > b.x1 && a.y1 < b.y2) &&
				(a.x1 < b.x2 && a.y1 < b.y2) &&	(a.x1 < b.x2 && a.y1 > b.y1)
			) {
				// console.log(2)
				return false;
			}
			if (
				(a.x1 > b.x1 && a.y2 > b.y1) && (a.x1 > b.x1 && a.y2 < b.y2) &&
				(a.x1 < b.x2 && a.y2 < b.y2) && (a.x1 < b.x2 && a.y2 > b.y1)
			) {
				// console.log(3)
				return false;
			}
			if (
				(a.x2 > b.x1 && a.y2 > b.y1) && (a.x2 > b.x1 && a.y2 < b.y2) &&
				(a.x2 < b.x2 && a.y2 < b.y2) &&	(a.x2 < b.x2 && a.y2 > b.y1)
			) {
				// console.log(4)
				return false;
			}
			if (
				(a.x2 > b.x1 && a.y1 > b.y1) &&	(a.x2 > b.x1 && a.y1 < b.y2) &&
				(a.x2 < b.x2 && a.y1 < b.y2) && (a.x2 < b.x2 && a.y1 > b.y1)
			) {
				// console.log(5)
				return false;
			}
			if (
				(b.x1 > a.x1 && b.y1 > a.y1) && (b.x1 > a.x1 && b.y1 < a.y2) &&
				(b.x1 < a.x2 && b.y1 < a.y2) &&	(b.x1 < a.x2 && b.y1 > a.y1)
			) {
				// console.log(6)
				return false;
			}
			if (
				(b.x1 > a.x1 && b.y2 > a.y1) &&	(b.x1 > a.x1 && b.y2 < a.y2) &&
				(b.x1 < a.x2 && b.y2 < a.y2) &&	(b.x1 < a.x2 && b.y2 > a.y1)
			) {
				// console.log(7)
				return false;
			}
			if (
				(b.x2 > a.x1 && b.y2 > a.y1) &&	(b.x2 > a.x1 && b.y2 < a.y2) &&
				(b.x2 < a.x2 && b.y2 < a.y2) &&	(b.x2 < a.x2 && b.y2 > a.y1)
			) {
				// console.log(8)
				return false;
			}
			if (
				(b.x2 > a.x1 && b.y1 > a.y1) &&	(b.x2 > a.x1 && b.y1 < a.y2) &&
				(b.x2 < a.x2 && b.y1 < a.y2) &&	(b.x2 < a.x2 && b.y1 > a.y1)
			) {
				// console.log(9)
				return false;
			}
			if (
				(a.x2 >= b.x2 && a.y2 >= b.y1) && (a.x2 >= b.x2 && a.y2 <= b.y2) &&
				(a.x1 <= b.x1 && a.y1 <= b.y2) &&	(a.x1 <= b.x1 && a.y1 >= b.y1)
			) {
				if (a.x1 == b.x2 || a.y1 == b.y2 || a.x2 == b.x1 || a.y2 == b.y1) {
					// console.log(12)
					return true;
				}
				// console.log(10)
				return false;
			}
			if (
				(a.x2 >= b.x1 && a.y2 >= b.y2) &&	(a.x2 >= b.x1 && a.y1 <= b.y1) &&
				(a.x1 <= b.x2 && a.y1 <= b.y1) &&	(a.x1 <= b.x2 && a.y2 >= b.y2)
			) {
				if (a.x1 == b.x2 || a.y1 == b.y2 || a.x2 == b.x1 || a.y2 == b.y1) {
					// console.log(13)
					return true;
				}
				// console.log(11)
				return false;
			}
		}
		// console.log(14);
		return true;
	},

}
// END Native Function