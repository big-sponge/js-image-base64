var base64Image = function (param) {

    var fileInput = param.file;

    var widthInput = param.width ? param.width : 750;

    var ratioInput = param.ratio ? param.ratio : 0.75;

    var callback = param.callback ? param.callback : null;
   		
    if (!window.FileReader) {
        alert("请升级浏览器");
        return;
    }
    var file   = fileInput.files[0];
    var reader = new FileReader();

    /*判断图片方向*/
    var orientation = null;
    EXIF.getData(file, function () {
        //EXIF.getAllTags(this);
        orientation = EXIF.getTag(this, 'Orientation');
        reader.readAsDataURL(file);
    });

    reader.onloadstart = function () {
    };
    reader.onerror     = function () {
    };
    reader.onload = function () {
        /*创建新的图片JS对象*/
        fileInput.value="";

        /*创建新的图片JS对象*/
        var image    = new Image();
        image.src    = this.result;
        image.onload = function () {
            var canvas = document.createElement("canvas");
            var scale  = image.width / image.height;
            if (orientation == 6) {
                //右转 90
                canvas.width  = image.height < widthInput ? image.height : widthInput;
                canvas.height = parseInt(canvas.width * scale);
                canvas.getContext("2d").rotate(90 * Math.PI / 180);
                canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, -canvas.width, canvas.height, canvas.width);
            } else if (orientation == 8) {
                //左转 90
                canvas.width  = image.height < widthInput ? image.height : widthInput;
                canvas.height = parseInt(canvas.width * scale);
                canvas.getContext("2d").rotate(-90 * Math.PI / 180);
                canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, -canvas.height, 0, canvas.height, canvas.width);
            } else if (orientation == 3) {
                //右转 180
                canvas.width  = image.width < widthInput ? image.width : widthInput;
                canvas.height = parseInt(canvas.width / scale);
                canvas.getContext("2d").translate(canvas.width, 0);
                canvas.getContext("2d").scale(-1, 1);
                canvas.getContext("2d").translate(0, canvas.height);
                canvas.getContext("2d").scale(1, -1);
                canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            } else {
                //正常
                canvas.width  = image.width < widthInput ? image.width : widthInput;
                canvas.height = parseInt(canvas.width / scale);
                canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            }
            var imageUrl = canvas.toDataURL("image/jpeg", ratioInput);

            if (callback) {
                callback(imageUrl)
            }
        };
    };

};