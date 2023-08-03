# SVG环形进度条的实现方法

`转载` `2016-07-31 18:12:36`

文章转载自：https://www.zybuluo.com/dengzhirong/note/178108

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SVG环形进度条</title>
    <style>
        #circleProcess {
            position: relative;
            top: 0;
            left: 0;
            width: 200px;
            height: 200px;
            stroke-dasharray: 255%;
            stroke-dashoffset: 255%;
            stroke: #6FEC6F;
            fill: none;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            transform: rotate(-90deg);
        }
    </style>
</head>
<body>
    <svg id="circleProcess" xmlns="http://www.w3.org/2000/svg">
        <circle id="circle" cx="50%" cy="50%" r="40%" stroke-width="10%"></circle>
    </svg>

    <script>
        var circleProcess = document.getElementById("circleProcess");
        var circle = document.getElementById("circle");

        var rangeValue = 0;
		var cc;
		function setCircle() {
            rangeValue = Number(rangeValue);
            circle.setAttribute("stroke-dashoffset", (255 - rangeValue) + "%");
			rangeValue += 1;
			if(rangeValue == 240){
				clearInterval(cc);
			}
			console.log(rangeValue);
        }

		cc = setInterval("setCircle()",1);

    </script>
</body>
</html>
```