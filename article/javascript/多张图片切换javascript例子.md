# 多张图片切换javascript例子

`转载` `2011-06-18 22:17:00`

转载自：[http://apps.hi.baidu.com/share/detail/5472492](http://apps.hi.baidu.com/share/detail/5472492)

多张图片切换javascript例子，可以选择切换的样式，不过不能选择指定的图片

```html
<table width="535" height="215" border="0" cellpadding="0"
    cellspacing="0">
    <tr>
        <td width="450" height="215">
            <mce:script language=JavaScript><!--
//js代码               
                    var bannerAD=new Array(); //用于存放图片路径（相对路径）
                    var adNum=0;        
                    bannerAD[0]="images/mibao.jpg";
                    bannerAD[1]="images/IMG_0882.JPG";
                    bannerAD[2]="images/IMG_0883.JPG";
                    bannerAD[3]="images/IMG_0884.JPG";
                    function setTransition(){
                        if (document.all){ 
                            bannerADrotator.filters.revealTrans.Transition=Math.floor(Math.random()*23);//设置图片切换
                            bannerADrotator.filters.revealTrans.apply(); //应用图片切换
                        }     
                    }       

                    function playTransition(){
                        if (document.all)
                            bannerADrotator.filters.revealTrans.play() //播放图片
                    }            

                    function nextAd(){
                        if(adNum<bannerAD.length-1)adNum++;
                        else adNum=0;
                        setTransition();
                        document.images.bannerADrotator.src=bannerAD[adNum];
                        playTransition();
                        theTimer=setTimeout("nextAd()", 5000); //5秒钟切换一张图片
                    }                          
                    
// --></mce:script>

            <img style="FILTER: revealTrans(duration=2,transition=20)" mce_style="FILTER: revealTrans(duration=2,transition=20)" height=292 src="" width=515 border=1 name=bannerADrotator>
            <SCRIPT language=JavaScript>nextAd()</SCRIPT>
        </td>
    </tr>
</table> 
```

