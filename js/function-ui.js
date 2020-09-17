// BEGIN Init
// $('.tab-header.decryption').removeClass('active');
// $('.decryption-content').hide();
// $('.tab-header.encryption').addClass('active');
// $('.encryption-content').show();
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
	current_block = 1;
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
	current_block = 2;
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
	current_block = 3;
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
	current_block = 4;
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
	current_block = 5;
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

// BEGIN Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// END Tooltips

// BEGIN Reset 
$('#btn-reset-curr-block').on('click', function () {
	resetCurrentSelectedBlock();
	console.log('adsfadfas');
});

$('#btn-close-image').on('click', function() {
	$(this).hide();
	$('.btn-import-image').show()
	resetAll();
})
// END Reset 