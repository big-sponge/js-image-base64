
## 简介

JS前端上传图片、压缩、并且处理旋转问题，生成base64数据

### 演示地址

http://www.tkc8.com/test/pic/index.html


## 示例代码

```

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>image-test</title>
    <meta charset="utf-8"/>
    <script src="base64image.js" type="text/javascript"></script>
    <script src="exif.js" type="text/javascript"></script>	
</head>
<body>
    <input type="file" style="display: none" onchange="fileUp(this)" id="file-up">
    <input type="button" value="点我上传图片"  onclick="$('#file-up').click();" />
    <div id='image-list'></div>

    <script>
        var fileUp = function (me) {
            base64Image({
                width:750,                             /*【选填】宽度默认750，如果图片尺寸大于该宽度，图片将被设置为该宽度*/
                ratio:0.75,                            /*【选填】压缩率默认0.75 */
                file: me,                              /*【必填】对应的上传元素 */
                callback: function (imageUrl) {        /*【必填】处理成功后的回调函数 */
                    /*imageUrl为得到的图片base64数据，这里可以进行上传到服务器或者其他逻辑操作 */
                    var img = new Image();
                    img.src = imageUrl;
                    $("#image-list").append(img);
                },
            });
        };
    </script>
</body>
</html>

```


