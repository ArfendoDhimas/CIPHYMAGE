// BEGIN Input Image
$('#btn-import-image').on('change',function (files){
	var file =  files.target.files[0];
	console.log(file);
	if (isSupportedImageFile(file))
	{
		image_metadata = {
			name : file.name.split('.').slice(0,-1).join('.'),
			type : file.type,
		};
	console.log(image_metadata);
	var reader = new FileReader();
		reader.onload = (function(file_input){
			return (function(e){
				source_image.attr('src',e.target.result);
			});
		})(file);
		reader.readAsDataURL(file);
		source_image.prop('hidden',false);	
		enableFormEncrypt();
		enableFormDecrypt();
		$('.panel-content').addClass('active');
		$('.panel-select-block .tab-content [type="number"]').prop('disabled',false);
	}
})
$('#source-image').on('load', function () {
	image_h = $(this)[0].naturalHeight;
	image_w = $(this)[0].naturalWidth;
	setMaxAllBlock(image_w, image_h);
});

function isSupportedImageFile(file)
{
	if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/bmp')
	{
		throw 'File image not Valid!';
	}
	return true;
}
// END Input Image

