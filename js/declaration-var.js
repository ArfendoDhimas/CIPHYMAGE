// BEGIN Declaration Variable
var source_canvas;
var source_image;
var image_h, image_w;
var current_block = 1;
// END Declaration Variable

// BEGIN Native Function
function resetAll(){
	block1.reset();
	block2.reset();
	block3.reset();
	block4.reset();
	block5.reset();
	this.resetPanelEncrypt();
	this.resetPanelDecrypt();
	this.setMaxAllBlock(0,0);
	this.resetImage();
	$('#btn-import-image').val('');
	$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
}
function resetPanelEncrypt() {
	$('#input-key-encrypt').val('');
	$('#input-iv-encrypt').val('');
	$('#input-passphrase-encrypt').val('');
}
function resetPanelDecrypt() {
	$('#input-key-file',null);
	$('#input-passphrase-decrypt').val('');
	$('#input-key-decrypt').val('');
	$('#input-iv-decrypt').val('');
}
function setMaxAllBlock(max_x, max_y) {
	$('.input-x').attr('max', max_x);
	$('.input-y').attr('max', max_y);
}
function resetCurrentSelectedBlock() {
	switch(current_block) {
		case 1 : block1.reset(); break;
		case 2 : block2.reset(); break;
		case 3 : block3.reset(); break;
		case 4 : block4.reset(); break;
		case 5 : block5.reset(); break;
	}
}
function resetImage() {
	source_image.removeAttr('src');
	image_h = 0;
	image_w = 0;
	source_canvas.height = image_h;
	source_canvas.width = image_w;
	
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
			if (this.startX >= block1.x1 && this.startY >= block1.y1) {
				if (this.startX <= block1.x2 && this.startY <= block1.y2) {
					return;
				}
			}
			if (this.endX >= block1.x1 && this.endY >= block1.y1) {
				if (this.endX <= block1.x2 && this.endY <= block1.y2) {
					return;
				}
			}
			this.status_draw = true;
			this.endX = this.startX;
			this.endY = this.startY;
			switch(current_block) {
				case 1 : 
						block1.setX1(this.startX);
						block1.setY1(this.startY);
						block1.setX2(this.endX);
						block1.setY2(this.endY);
						break;
				case 2 : 
						block2.setX1(this.startX);
						block2.setY1(this.startY);
						block2.setX2(this.endX);
						block2.setY2(this.endY);
						break;
				case 3 : 
						block3.setX1(this.startX);
						block3.setY1(this.startY);
						block3.setX2(this.endX);
						block3.setY2(this.endY);
						break;
				case 4 : 
						block4.setX1(this.startX);
						block4.setY1(this.startY);
						block4.setX2(this.endX);
						block4.setY2(this.endY);
						break;
				case 5 : 
						block5.setX1(this.startX);
						block5.setY1(this.startY);
						block5.setX2(this.endX);
						block5.setY2(this.endY);
						break;
			}
		}
	},
	mouseMove : function(mouse) {
		var relativeX = mouse.clientX - source_image.offset().left;
		var relativeY = mouse.clientY - source_image.offset().top;
		this.endX = Math.floor(relativeX * image_w / source_image.width());
		this.endY = Math.floor(relativeY * image_h / source_image.height());
		if (this.status_draw) {
			// if (current_block != 1) {
			// 	if(!this.isValidBlock(block1)) {
			// 		return;
			// 	}
			// }
			// if (current_block != 2) {
			// 	if(!this.isValidBlock(block2)) {
			// 		return;
			// 	}
			// }
			// if (current_block != 3) {
			// 	if(!this.isValidBlock(block3)) {
			// 		return;
			// 	}
			// }
			// if (current_block != 4) {
			// 	if(!this.isValidBlock(block4)) {
			// 		return;
			// 	}
			// }
			// if (current_block != 5) {
			// 	if(!this.isValidBlock(block5)) {
			// 		return;
			// 	}
			// }
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
			switch(current_block) {
				case 1 : 
						block1.setX1(tempX1);
						block1.setY1(tempY1);
						block1.setX2(tempX2);
						block1.setY2(tempY2);
						break;
				case 2 : 
						block2.setX1(tempX1);
						block2.setY1(tempY1);
						block2.setX2(tempX2);
						block2.setY2(tempY2);
						break;
				case 3 : 
						block3.setX1(tempX1);
						block3.setY1(tempY1);
						block3.setX2(tempX2);
						block3.setY2(tempY2);
						break;
				case 4 : 
						block4.setX1(tempX1);
						block4.setY1(tempY1);
						block4.setX2(tempX2);
						block4.setY2(tempY2);
						break;
				case 5 : 
						block5.setX1(tempX1);
						block5.setY1(tempY1);
						block5.setX2(tempX2);
						block5.setY2(tempY2);
						break;
			}
		}
	},
	isValidBlock : function(block) {
		// fix block tengah
		if (this.endX >= block.x1 && this.endY >= block.y1 && this.endX <= block.x2 && this.endY <= block.y2) {
				return false;
		}
		// fix lewat tengah
		if (this.startX >= block.x1 && this.endY >= block.y1 && this.endX <= block.x2 && this.startY <= block.y2) {
				return false;
		}
		if (this.startX >= block.x1 && this.startY >= block.y1 && this.endX <= block.x2  && this.endY <= block.y2) {
				return false;
		}
		if (this.endX >= block.x2  && this.startY >= block.y1 && this.startX <= block.x1 && this.endY <= block.y2) {
				return false;
		}
		// fix block kiri atas
		if (block.x1 >= this.startX && block.y1 >= this.startY && block.x1 <= this.endX && block.y1 <= this.endY) {
			return false;
		}
		if (block.x1 >= this.endX && block.y1 >= this.startY && block.x1 <= this.startX && block.y1 <= this.endY) {
			return false;
		}
		if (block.x1 >= this.startX && block.y1 >= this.endY && block.x1 <= this.endX && block.y1 <= this.startY) {
			return false;
		}
		// fix block kanan bawah
		if (block.x2 >= this.endX && block.y2 >= this.endY && block.x2 <= this.startX && block.y2 <= this.startY) {
			return false;
		}
		if (block.x2 >= this.startX && block.y2 >= this.endY && block.x2 <= this.endX && block.y2 <= this.startY) {
			return false;
		}
		if (block.x2 >= this.endX && block.y2 >= this.startY && block.x2 <= this.startX && block.y2 <= this.endY) {
			return false;
		}
		// fix block kiri bawah
		if (block.x1 >= this.startX && block.y2 >= this.endY && block.x1 <= this.endX && block.y2 <= this.startY) {
			return false;
		}
		if (block.x1 >= this.endX && block.y2 >= this.endY && block.x1 <= this.startX && block.y2 <= this.startY) {
			return false;
		}
		if (block.x1 >= this.startX && block.y2 >= this.startY && block.x1 <= this.endX && block.y2 <= this.endY) {
			return false;
		}
		// fix block kanan atas
		if (block.x2 >= this.endX && block.y1 >= this.startY && block.x2 <= this.startX && block.y1 <= this.endY) {
			return false;
		}
		if (block.x2 >= this.endX && block.y1 >= this.endY && block.x2 <= this.startX && block.y1 <= this.startY) {
			return false;
		}
		if (block.x2 >= this.startX && block.y1 >= this.startY && block.x2 <= this.endX && block.y1 <= this.endY) {
			return false;
		}		
		return true;
	}
}

var input = {
	isValidBlock : function(block) {
		var blocks = [block1, block2, block3, block4, block5];
		var a = block;
		for (var i = 0; i < blocks.length; i++) {
			if (current_block == i+1) {
				continue;
			}
			var b = blocks[i];
			if (a.x1 < b.x1) {
				if (a.y1 < b.y1) {
					if (a.x2 > b.x1) {
						if (a.y2 > b.y1) {
							return false;
						}
					}
				} else {
					if (a.x2 > b.x1) {
						if (a.y2 <= b.y2) {
							return false;
						}
					}
				}
				if (a.y1 < b.y2) {
					if (a.x2 > b.x1) {
						if (a.y2 > b.y2) {
							return false;
						}
					}
				}
			} else {
				if (a.y1 < b.y1) {
					if (a.x2 <= b.x2) {
						if (a.y2 > b.y1) {
							return false;
						}
					}
				}
				if (a.y1 < b.y2) {
					if (a.x2 <= b.x2) {
						if (a.y2 > b.y2) {
							return false;
						}
					}
				}
			}
			if (a.x1 < b.x2) {
				if (a.y1 < b.y1) {
					if (a.x2 > b.x2) {
						if (a.y2 > b.y1) {
							return false;
						}
					}
				} else {
					if (a.x2 > b.x2) {
						if (a.y2 < b.y2) {
							return false;
						}
					}
				}
				if (a.y1 < b.y2) {
					if (a.x2 > b.x2) {
						if (a.y2 > b.y2) {
							return false;
						}
					}
				}
				
			}

			return true;
		}
	}
}

var block1 = {
	x1 : 0, y1 : 0, x2 : 0, y2 : 0,
	setX1 : function(value) {
		var temp = this.x1;
		this.x1 = value;
		this.setX2(this.x2);
		if (input.isValidBlock(this)) {
			temp = this.x1 * 100 / image_w;
			$('#block1-x1').val(value);
			$('#rect-block-1').css('left',temp+'%');
		} else {
			this.x1 = temp;
			this.setX2(this.x2);
		}
	},
	setY1 : function (value) {
		var temp = this.y1;
		this.y1 = value;
		this.setY2(this.y2);
		if (input.isValidBlock(this)) {
			temp = this.y1 * 100 / image_h;
			$('#block1-y1').val(value);
			$('#rect-block-1').css('top',temp+'%');
		} else {
			this.y1 = temp;
			this.setY1(this.y1);
		}
	},
	setX2 : function(value) {
		var temp = this.x2;
		this.x2 = value;
		if (input.isValidBlock(this)) {
			temp = (this.x2 - this.x1) * 100 / image_w;
			$('#block1-x2').val(value);
			$('#rect-block-1').css('width',temp+'%');
		} else {
			this.x2 = temp;
		}
	},
	setY2 : function (value) {
		var temp = this.y2;
		this.y2 = value;
		if (input.isValidBlock(this)) {
			temp = (this.y2 - this.y1) * 100 / image_h;
			$('#block1-y2').val(value);
			$('#rect-block-1').css('height',temp+'%');
		} else {
			this.y2 = temp;
		}
	},
	reset: function() {
		this.setX1(0);
		this.setY1(0);
		this.setX2(0);
		this.setY2(0);
		eventImage.status_draw = false;
	},
}
var block2 = {
	x1 : 0, y1 : 0, x2 : 0, y2 : 0,
	setX1 : function(value) {
		var temp = this.x1;
		this.x1 = value;
		this.setX2(this.x2);
		if (input.isValidBlock(this)) {
			temp = this.x1 * 100 / image_w;
			$('#block2-x1').val(value);
			$('#rect-block-2').css('left',temp+'%');
		} else {
			this.x1 = temp;
			this.setX2(this.x2);
		}
	},
	setY1 : function (value) {
		var temp = this.y1;
		this.y1 = value;
		this.setY2(this.y2);
		if (input.isValidBlock(this)) {
			temp = this.y1 * 100 / image_h;
			$('#block2-y1').val(value);
			$('#rect-block-2').css('top',temp+'%');
		} else {
			this.y1 = temp;
			this.setY2(this.y2);
		}
	},
	setX2 : function(value) {
		var temp = this.x2;
		this.x2 = value;
		if (input.isValidBlock(this)) {
			temp = (this.x2 - this.x1) * 100 / image_w;
			$('#block2-x2').val(value);
			$('#rect-block-2').css('width',temp+'%');
		} else {
			this.x2 = temp;
		}
	},
	setY2 : function (value) {
		var temp = this.y2;
		this.y2 = value;
		if (input.isValidBlock(this)) {
			temp = (this.y2 - this.y1) * 100 / image_h;
			$('#block2-y2').val(value);
			$('#rect-block-2').css('height',temp+'%');
		} else {
			this.y2 = temp;
		}
	},
	reset: function() {
		this.setX1(0);
		this.setY1(0);
		this.setX2(0);
		this.setY2(0);
		eventImage.status_draw = false;
	},
}
var block3 = {
	x1 : 0, y1 : 0, x2 : 0, y2 : 0,
	setX1 : function(value) {
		this.x1 = value;
		var temp = this.x1 * 100 / image_w;
		$('#block3-x1').val(value);
		$('#rect-block-3').css('left',temp+'%');
		this.setX2(this.x2);
	},
	setY1 : function (value) {
		this.y1 = value;
		var temp = this.y1 * 100 / image_h;
		$('#block3-y1').val(value);
		$('#rect-block-3').css('top',temp+'%');
		this.setY2(this.y2);
	},
	setX2 : function(value) {
		this.x2 = value;
		var temp = (this.x2 - this.x1) * 100 / image_w;
		$('#block3-x2').val(value);
		$('#rect-block-3').css('width',temp+'%');
	},
	setY2 : function (value) {
		this.y2 = value;
		var temp = (this.y2 - this.y1) * 100 / image_h;
		$('#block3-y2').val(value);
		$('#rect-block-3').css('height',temp+'%');
	},
	reset: function() {
		this.setX1(0);
		this.setY1(0);
		this.setX2(0);
		this.setY2(0);
		eventImage.status_draw = false;
	},
}
var block4 = {
	x1 : 0, y1 : 0, x2 : 0, y2 : 0,
	setX1 : function(value) {
		this.x1 = value;
		var temp = this.x1 * 100 / image_w;
		$('#block4-x1').val(value);
		$('#rect-block-4').css('left',temp+'%');
		this.setX2(this.x2);
	},
	setY1 : function (value) {
		this.y1 = value;
		var temp = this.y1 * 100 / image_h;
		$('#block4-y1').val(value);
		$('#rect-block-4').css('top',temp+'%');
		this.setY2(this.y2);
	},
	setX2 : function(value) {
		this.x2 = value;
		var temp = (this.x2 - this.x1) * 100 / image_w;
		$('#block4-x2').val(value);
		$('#rect-block-4').css('width',temp+'%');
	},
	setY2 : function (value) {
		this.y2 = value;
		var temp = (this.y2 - this.y1) * 100 / image_h;
		$('#block4-y2').val(value);
		$('#rect-block-4').css('height',temp+'%');
	},
	reset: function() {
		this.setX1(0);
		this.setY1(0);
		this.setX2(0);
		this.setY2(0);
		eventImage.status_draw = false;
	},
}
var block5 = {
	x1 : 0, y1 : 0, x2 : 0, y2 : 0,
	setX1 : function(value) {
		this.x1 = value;
		var temp = this.x1 * 100 / image_w;
		$('#block5-x1').val(value);
		$('#rect-block-5').css('left',temp+'%');
		this.setX2(this.x2);
	},
	setY1 : function (value) {
		this.y1 = value;
		var temp = this.y1 * 100 / image_h;
		$('#block5-y1').val(value);
		$('#rect-block-5').css('top',temp+'%');
		this.setY2(this.y2);
	},
	setX2 : function(value) {
		this.x2 = value;
		var temp = (this.x2 - this.x1) * 100 / image_w;
		$('#block5-x2').val(value);
		$('#rect-block-5').css('width',temp+'%');
	},
	setY2 : function (value) {
		this.y2 = value;
		var temp = (this.y2 - this.y1) * 100 / image_h;
		$('#block5-y2').val(value);
		$('#rect-block-5').css('height',temp+'%');
	},
	reset: function() {
		this.setX1(0);
		this.setY1(0);
		this.setX2(0);
		this.setY2(0);
		eventImage.status_draw = false;
	},
}
// END Native Function