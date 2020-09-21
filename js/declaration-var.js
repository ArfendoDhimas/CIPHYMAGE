// BEGIN Declaration Variable
var source_image;
var result_image, jckey, timestamp;
var image_h, image_w;
// END Declaration Variable

// BEGIN Native Function
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
	for (var i = 0 ; i < blocks.data.length; i++) {
		blocks.data[i].reset();
	}
	this.resetPanelEncrypt();
	this.resetPanelDecrypt();
	this.setMaxAllBlock(0,0);
	this.resetImage();
	$('#btn-import-image').val('');
	$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
}
function resetPanelEncrypt() {
	$('#input-mode-encrypt').val('aes-cbc');
	$('#input-key-length').val('128');
	$('#input-key-encrypt').val('');
	$('#input-iv-encrypt').val('');
	$('#input-passphrase-encrypt').val('');

	$('#input-mode-encrypt').prop('disabled',true);
	$('#input-key-length').prop('disabled',true);
	$('#input-key-encrypt').prop('disabled',true);
	$('#input-iv-encrypt').prop('disabled',true);
	$('#input-passphrase-encrypt').prop('disabled',true);
	$('#btn-encrypt').prop('disabled',true);
}
function enableFormEncrypt() {
	$('#input-mode-encrypt').prop('disabled',false);
	$('#input-key-length').prop('disabled',false);
	$('#input-key-encrypt').prop('disabled',false);
	$('#input-iv-encrypt').prop('disabled',false);
	$('#input-passphrase-encrypt').prop('disabled',false);
	$('#btn-encrypt').prop('disabled',false);
}
function resetPanelDecrypt() {
	$('#input-key-file',null);
	$('#input-passphrase-decrypt').val('');
	$('#input-key-decrypt').val('');
	$('#input-iv-decrypt').val('');

	$('#input-jckey-file').prop('disabled',true);
	$('#input-passphrase-decrypt').prop('disabled',true);
	$('#input-key-decrypt').prop('disabled',true);
	$('#input-iv-decrypt').prop('disabled',true);
	$('#btn-decrypt').prop('disabled',true);
}
function enableFormDecrypt() {
	$('#input-jckey-file').prop('disabled',false);
	$('#input-passphrase-decrypt').prop('disabled',false);
	$('#input-key-decrypt').prop('disabled',false);
	$('#input-iv-decrypt').prop('disabled',false);
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
	source_image.removeAttr('src');
	image_h = 0;
	image_w = 0;
}

var eventImage = {
	status_draw : false,
	startX : 0, startY : 0, endX : 0, endY : 0,
	mouseDown : function(mouse) {
		var relativeX = mouse.clientX - source_image.offset().left;
		var relativeY = mouse.clientY - source_image.offset().top;
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
	mouseMove : function(mouse) {
		var relativeX = mouse.clientX - source_image.offset().left;
		var relativeY = mouse.clientY - source_image.offset().top;
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
			x1 : 1, y1 : 1, x2 : 1, y2 : 1,
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
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 1;
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
			x1 : 2, y1 : 2, x2 : 2, y2 : 2,
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
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 2;
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
			x1 : 3, y1 : 3, x2 : 3, y2 : 3,
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
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 3;
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
			x1 : 4, y1 : 4, x2 : 4, y2 : 4,
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
			},
			reset: function() {
				this.x1 = this.y1 = this.x2 = this.y2 = 4;
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
			if (a.x1)
			if (blocks.curr == i) {
				continue;
			}
			var b = blocks.data[i];
			if (
				a.x1 < 0 || image_w < a.x1 || a.y1 < 0 || image_h < a.y1 ||
				a.x2 < 0 || image_w < a.x2 || a.y2 < 0 || image_h < a.y2
			) {
				return false;
			}
			if (
				(a.x1 > b.x1 && a.y1 > b.y1) && (a.x1 > b.x1 && a.y1 < b.y2) &&
				(a.x1 < b.x2 && a.y1 < b.y2) &&	(a.x1 < b.x2 && a.y1 > b.y1)
			) {
				return false;
			}
			if (
				(a.x1 > b.x1 && a.y2 > b.y1) && (a.x1 > b.x1 && a.y2 < b.y2) &&
				(a.x1 < b.x2 && a.y2 < b.y2) && (a.x1 < b.x2 && a.y2 > b.y1)
			) {
				return false;
			}
			if (
				(a.x2 > b.x1 && a.y2 > b.y1) && (a.x2 > b.x1 && a.y2 < b.y2) &&
				(a.x2 < b.x2 && a.y2 < b.y2) &&	(a.x2 < b.x2 && a.y2 > b.y1)
			) {
				return false;
			}
			if (
				(a.x2 > b.x1 && a.y1 > b.y1) &&	(a.x2 > b.x1 && a.y1 < b.y2) &&
				(a.x2 < b.x2 && a.y1 < b.y2) && (a.x2 < b.x2 && a.y1 > b.y1)
			) {
				return false;
			}
			if (
				(b.x1 > a.x1 && b.y1 > a.y1) && (b.x1 > a.x1 && b.y1 < a.y2) &&
				(b.x1 < a.x2 && b.y1 < a.y2) &&	(b.x1 < a.x2 && b.y1 > a.y1)
			) {
				return false;
			}
			if (
				(b.x1 > a.x1 && b.y2 > a.y1) &&	(b.x1 > a.x1 && b.y2 < a.y2) &&
				(b.x1 < a.x2 && b.y2 < a.y2) &&	(b.x1 < a.x2 && b.y2 > a.y1)
			) {
				return false;
			}
			if (
				(b.x2 > a.x1 && b.y2 > a.y1) &&	(b.x2 > a.x1 && b.y2 < a.y2) &&
				(b.x2 < a.x2 && b.y2 < a.y2) &&	(b.x2 < a.x2 && b.y2 > a.y1)
			) {
				return false;
			}
			if (
				(b.x2 > a.x1 && b.y1 > a.y1) &&	(b.x2 > a.x1 && b.y1 < a.y2) &&
				(b.x2 < a.x2 && b.y1 < a.y2) &&	(b.x2 < a.x2 && b.y1 > a.y1)
			) {
				return false;
			}
			if (
				(a.x2 >= b.x2 && a.y2 >= b.y1) && (a.x2 >= b.x2 && a.y2 <= b.y2) &&
				(a.x1 <= b.x1 && a.y1 <= b.y2) &&	(a.x1 <= b.x1 && a.y1 >= b.y1)
			) {
				return false;
			}
			if (
				(a.x2 >= b.x1 && a.y2 >= b.y2) &&	(a.x2 >= b.x1 && a.y1 <= b.y1) &&
				(a.x1 <= b.x2 && a.y1 <= b.y1) &&	(a.x1 <= b.x2 && a.y2 >= b.y2)
			) {
				return false;
			}
		}
		return true;
	},

}
// END Native Function