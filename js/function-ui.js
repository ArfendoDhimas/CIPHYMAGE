// BEGIN Init
init();
// END Init

// BEGIN Button Minimize Panel Block
$('#btn-close-panel-block').on('click',function(){
	if ($('#btn-close-panel-block').hasClass('active'))
	{
		$('#btn-close-panel-block').removeClass('active');
		$('.selection-box .tab-content').removeClass('active');
	}
	else
	{
		$('#btn-close-panel-block').addClass('active');
		$('.selection-box .tab-content').addClass('active');
	}
});
// END Button Minimize Panel Block

// BEGIN Show Panel Block
$('#btn-panel-block-1').on('click', function () {
	blocks.curr = 0;
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-1').hasClass('active')){
		$('.selection-block #select-block-1').slideUp(300,function(){
			$('.selection-block .tab-content').removeClass('active');
			$('.selection-block .tab-header').removeClass('active');
		});
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #radio-block-1').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-1').addClass('active');
		$('.selection-block #select-block-1').slideDown(300);
	}
});
$('#btn-panel-block-2').on('click', function () {
	blocks.curr = 1;
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-2').hasClass('active')){
		$('.selection-block #select-block-2').slideUp(300,function(){
			$('.selection-block .tab-content').removeClass('active');
			$('.selection-block .tab-header').removeClass('active');
		});
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #radio-block-2').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-2').addClass('active');
		$('.selection-block #select-block-2').slideDown(300);
	}
});
$('#btn-panel-block-3').on('click', function () {
	blocks.curr = 2;
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-3').hasClass('active')){
		$('.selection-block #select-block-3').slideUp(300,function(){
			$('.selection-block .tab-content').removeClass('active');
			$('.selection-block .tab-header').removeClass('active');
		});
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #radio-block-3').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-3').addClass('active');
		$('.selection-block #select-block-3').slideDown(300);
	}
});
$('#btn-panel-block-4').on('click', function () {
	blocks.curr = 3;
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-4').hasClass('active')){
		$('.selection-block #select-block-4').slideUp(300,function(){
			$('.selection-block .tab-content').removeClass('active');
			$('.selection-block .tab-header').removeClass('active');
		});
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #radio-block-4').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-4').addClass('active');
		$('.selection-block #select-block-4').slideDown(300);
	}
});
$('#btn-panel-block-5').on('click', function () {
	blocks.curr = 4;
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-5').hasClass('active')){
		$('.selection-block #select-block-5').slideUp(300,function(){
			$('.selection-block .tab-content').removeClass('active');
			$('.selection-block .tab-header').removeClass('active');
		});
	} else {
		$('.selection-block .tab-select').hide();
		$('.selection-block .tab-header').removeClass('active');
		$('.selection-block #radio-block-5').prop('checked',true);
		$('.selection-block .tab-content').addClass('active');
		$('#btn-panel-block-5').addClass('active');
		$('.selection-block #select-block-5').slideDown(300);
	}
});
// END Show Panel Block 1

// BEGIN Show/Hide Sidebar
$('#btn-sidebar').on('click', function () {
	if ($('#btn-sidebar').hasClass('active'))
	{
		$('#btn-sidebar').removeClass('active');
		$('.sidebar').removeClass('active');
	} else {
		$('#btn-sidebar').addClass('active');
		$('.sidebar').addClass('active');
	}
});
// END Show/Hide Sidebar

// BEGIN Show/Hide Selection-Block Panel
$('.selection-block #btn-hide').on('click', function () {
	if ($('.selection-block #btn-hide').hasClass('active'))
	{
		$('.selection-block #btn-hide').removeClass('active');
		$('.selection-block').removeClass('active');
	} else {
		$('.selection-block #btn-hide').addClass('active');
		$('.selection-block').addClass('active');
	}
});
// END Show/Hide Selection-Block Panel

// BEGIN Show/Hide Panel Encryption/Decryption
$('.tab-header.encryption').on('click', function () {
		$('.tab-header.decryption').removeClass('active');
		$('.tab-content .decryption').hide();
		$('.tab-header.encryption').addClass('active');
		$('.tab-content .encryption').show();
});
$('.tab-header.decryption').on('click', function () {
		$('.tab-header.encryption').removeClass('active');
		$('.tab-content .encryption').hide();
		$('.tab-header.decryption').addClass('active');
		$('.tab-content .decryption').show();
});
// END Show/Hide Panel Encryption/Decryption

// BEGIN Show/Hide Panel Menu
$('#btn-menu').on('click', function () {
	if ($('#btn-menu').hasClass('active')) {
		$('#btn-menu').removeClass('active');
		$('.menu').slideUp();
		
	} else {
		$('#btn-menu').addClass('active');
		$('.menu').slideDown();
	}
});
// END Show/Hide Panel Menu

// BEGIN Enable Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// END Enable Tooltips

// BEGIN Reset 
$('#btn-reset-curr-block').on('click', function () {
	resetCurrentSelectedBlock();
});

$('#btn-close-panel-content').on('click', function() {
	resetAll();
	$('.panel-content').removeClass('active');
})
$('#btn-close-panel-result').on('click', function() {
	$('.header-result-encryption').hide();
	$('.header-result-decryption').hide();
	$('.panel-result').removeClass('active');
	$('.panel-select-block .tab-content [type="number"]').prop('disabled',false);
})
// END Reset 

// BEGIN Change Blocks
$('#block1-x1').on('change', function () {
	blocks.data[0].setX1(parseInt($(this).val()));
});
$('#block1-x2').on('change', function () {
	blocks.data[0].setX2(parseInt($(this).val()));
});
$('#block1-y1').on('change', function () {
	blocks.data[0].setY1(parseInt($(this).val()));
});
$('#block1-y2').on('change', function () {
	blocks.data[0].setY2(parseInt($(this).val()));
});

$('#block2-x1').on('change', function () {
	blocks.data[1].setX1(parseInt($(this).val()));
});
$('#block2-x2').on('change', function () {
	blocks.data[1].setX2(parseInt($(this).val()));
});
$('#block2-y1').on('change', function () {
	blocks.data[1].setY1(parseInt($(this).val()));
});
$('#block2-y2').on('change', function () {
	blocks.data[1].setY2(parseInt($(this).val()));
});

$('#block3-x1').on('change', function () {
	blocks.data[2].setX1(parseInt($(this).val()));
});
$('#block3-x2').on('change', function () {
	blocks.data[2].setX2(parseInt($(this).val()));
});
$('#block3-y1').on('change', function () {
	blocks.data[2].setY1(parseInt($(this).val()));
});
$('#block3-y2').on('change', function () {
	blocks.data[2].setY2(parseInt($(this).val()));
});

$('#block4-x1').on('change', function () {
	blocks.data[3].setX1(parseInt($(this).val()));
});
$('#block4-x2').on('change', function () {
	blocks.data[3].setX2(parseInt($(this).val()));
});
$('#block4-y1').on('change', function () {
	blocks.data[3].setY1(parseInt($(this).val()));
});
$('#block4-y2').on('change', function () {
	blocks.data[3].setY2(parseInt($(this).val()));
});

$('#block5-x1').on('change', function () {
	blocks.data[4].setX1(parseInt($(this).val()));
});
$('#block5-x2').on('change', function () {
	blocks.data[4].setX2(parseInt($(this).val()));
});
$('#block5-y1').on('change', function () {
	blocks.data[4].setY1(parseInt($(this).val()));
});
$('#block5-y2').on('change', function () {
	blocks.data[4].setY2(parseInt($(this).val()));
});
// END Change Blocks

// BEGIN Selection Blocks
$('.panel-content .block').on('mousedown', function (event) {
	eventImage.mouseDown(event);
});
$('.panel-content .block').on('mousemove', function (event) {
	eventImage.mouseMove(event);
});
// END Selection Blocks

// BEGIN Download Cipher Image
$('.header-result-encryption #download-result-image').on('click', function () {
	var a = document.createElement('a');
	a.href = result_image.attr('src');
	a.download = image_metadata.name+'_'+timestamp+'-ENCRYPTED';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
});
// BEGIN Download Cipher Image

// BEGIN Download JSON
$('.header-result-encryption  #download-json').on('click', function () {
	var blob_json_profile = new Blob([ciphymage_json],{type: 'application/json'});
	var a = document.createElement('a');
	a.href = URL.createObjectURL(blob_json_profile);
	a.download = image_metadata.name+'_'+timestamp+'-KEY';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
});
// END Download JSON

// BEGIN Download Result Image
$('.header-result-decryption #download-result-image').on('click', function () {
	var a = document.createElement('a');
	a.href = result_image.attr('src');
	a.download = ciphymage_json.image.name+'_'+timestamp+'-DECRYPTED';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
});
// BEGIN Download Result Image