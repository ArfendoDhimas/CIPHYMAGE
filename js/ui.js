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
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-1').hasClass('active')){
		$('.selection-block .tab-content').removeClass('active');
		$('.selection-block .tab-header').removeClass('active');
		console.log('1111');
	} else {
		console.log('2222');
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #select-block-1').show();
		$('.selection-block #radio-block-1').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-1').addClass('active');
	}
});
$('#btn-panel-block-2').on('click', function () {
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-2').hasClass('active')){
		$('.selection-block .tab-content').removeClass('active');
		$('.selection-block .tab-header').removeClass('active');
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #select-block-2').show();
		$('.selection-block #radio-block-2').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-2').addClass('active');
	}
});
$('#btn-panel-block-3').on('click', function () {
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-3').hasClass('active')){
		$('.selection-block .tab-content').removeClass('active');
		$('.selection-block .tab-header').removeClass('active');
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #select-block-3').show();
		$('.selection-block #radio-block-3').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-3').addClass('active');
	}
});
$('#btn-panel-block-4').on('click', function () {
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-4').hasClass('active')){
		$('.selection-block .tab-content').removeClass('active');
		$('.selection-block .tab-header').removeClass('active');
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #select-block-4').show();
		$('.selection-block #radio-block-4').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-4').addClass('active');
	}
});
$('#btn-panel-block-5').on('click', function () {
	if ($('.selection-block .tab-content').hasClass('active') && $('#btn-panel-block-5').hasClass('active')){
		$('.selection-block .tab-content').removeClass('active');
		$('.selection-block .tab-header').removeClass('active');
	} else {
		$('.selection-block .tab-content').addClass('active');
		$('.selection-block .tab-select').hide();
		$('.selection-block #select-block-5').show();
		$('.selection-block #radio-block-5').prop('checked',true);
		$('.selection-block .tab-header').removeClass('active');
		$('#btn-panel-block-5').addClass('active');
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
