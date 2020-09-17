// BEGIN Declaration Variable
var source_image_canvas;
var image_h, image_w;
var current_block;
// END Declaration Variable

// BEGIN Native Function
function val(selector, val)
{
	return $(selector).val(val);
}
function max(selector, max) {
	return $(selector).attr('max',max);
}
function resetAll(){
	this.resetPanelEncrypt();
	this.resetPanelDecrypt();
	this.resetBlock1();
	this.resetBlock2();
	this.resetBlock3();
	this.resetBlock4();
	this.resetBlock5();
	this.setMaxAllBlock(0,0);
	this.resetImage();
	this.val('#btn-import-image',"");
	$('.panel-select-block .tab-content [type="number"]').prop('disabled',true);
}
function resetPanelEncrypt() {
	this.val('#input-key-encrypt','');
	this.val('#input-iv-encrypt','');
	this.val('#input-passphrase-encrypt','');
}
function resetPanelDecrypt() {
	this.val('#input-key-file',null);
	this.val('#input-passphrase-decrypt','');
	this.val('#input-key-decrypt','');
	this.val('#input-iv-decrypt','');
}
function resetBlock1() {
	this.val('#koor1-x1',0);
	this.val('#koor1-y1',0);
	this.val('#koor1-x2',0);
	this.val('#koor1-y2',0);
}
function resetBlock2() {
	this.val('#koor2-x1',0);
	this.val('#koor2-y1',0);
	this.val('#koor2-x2',0);
	this.val('#koor2-y2',0);
}
function resetBlock3() {
	this.val('#koor3-x1',0);
	this.val('#koor3-y1',0);
	this.val('#koor3-x2',0);
	this.val('#koor3-y2',0);
}
function resetBlock4() {
	this.val('#koor4-x1',0);
	this.val('#koor4-y1',0);
	this.val('#koor4-x2',0);
	this.val('#koor4-y2',0);
}
function resetBlock5() {
	this.val('#koor5-x1',0);
	this.val('#koor5-y1',0);
	this.val('#koor5-x2',0);
	this.val('#koor5-y2',0);
}
function setMaxAllBlock(max_x, max_y) {
	this.max('#koor1-x1',max_x);
	this.max('#koor1-y1',max_y);
	this.max('#koor1-x2',max_x);
	this.max('#koor1-y2',max_y);

	this.max('#koor2-x1',max_x);
	this.max('#koor2-y1',max_y);
	this.max('#koor2-x2',max_x);
	this.max('#koor2-y2',max_y);

	this.max('#koor3-x1',max_x);
	this.max('#koor3-y1',max_y);
	this.max('#koor3-x2',max_x);
	this.max('#koor3-y2',max_y);

	this.max('#koor4-x1',max_x);
	this.max('#koor4-y1',max_y);
	this.max('#koor4-x2',max_x);
	this.max('#koor4-y2',max_y);

	this.max('#koor5-x1',max_x);
	this.max('#koor5-y1',max_y);
	this.max('#koor5-x2',max_x);
	this.max('#koor5-y2',max_y);

}
function resetCurrentSelectedBlock() {
	switch(current_block) {
		case 1 : this.resetBlock1(); break;
		case 2 : this.resetBlock2(); break;
		case 3 : this.resetBlock3(); break;
		case 4 : this.resetBlock4(); break;
		case 5 : this.resetBlock5(); break;
	}
}
function resetImage() {
	$('#source-image').removeAttr('src');
	image_h = 0;
	image_w = 0;
	source_image_canvas.height = image_h;
	source_image_canvas.width = image_w;
}
// END Native Function