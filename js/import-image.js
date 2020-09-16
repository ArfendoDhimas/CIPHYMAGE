// BEGIN Declaration Variable
var source_image_canvas;
var image_h, image_w;
// END Declaration Variable


// BEGIN Input Image
$('#btn-import-image').on('change',function (files){
	var file =  files.target.files[0];
	if (isValidFile(file))
	{
		var source_image = $('#source-image');
		var reader = new FileReader();
		reader.onload = (function(file_input){
			return (function(e){
				source_image.attr('src',e.target.result);
			});
		})(file);
		reader.readAsDataURL(file);
		source_image.prop('hidden',false);	
		$('.btn-import-image').hide();
		$('#btn-close-image').show();
	}
})
$('#source-image').on('load', function () {
	image_h = $(this)[0].naturalHeight;
	image_w = $(this)[0].naturalWidth;
	source_image_canvas = $('#canvas-image').first();
	var context = source_image_canvas.getContext('2d');
	source_image_canvas.height = image_h;
	source_image_canvas.width = image_w;
	context.drawImage($(this),0,0,image_w,image_h);
});

function isValidFile(file)
{
	if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/bmp')
	{
		throw 'File image not Valid!';
	}
	return true;
}
// END Input Image

// BEGIN Reset All
$('#btn-close-image').on('click', function() {
	$(this).hide();
	$('.btn-import-image').show()
	resetAll();
})
function resetAll(){
	
}
// END Reset All