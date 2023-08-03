# openWindow

`原创` `2011-12-30 15:21:06`

```js
/********************************************************************************
 **
 * 打开新窗口
 */
function openWindow(i_URL, i_Width, i_Height) {
    openWindow(i_URL, i_Width, i_Height, null, null);
}

function openWindow(i_URL, i_Width, i_Height, i_Feature) {
    openWindow(i_URL, i_Width, i_Height, null, i_Feature);
}

function openWindow(i_URL, i_Width, i_Height, i_WindowName, i_Feature)
{
    var v_URL = i_URL;
    var v_Width = i_Width;
    var v_Height = i_Height;
    var v_WindowName = i_WindowName;
    var v_Top;
    var v_Left;
    var v_Feature = "";
    if (v_WindowName == null) {
        v_WindowName = "myWindow";
    }

    var objWindow
    if (!objWindow || objWindow.closed)
    {
        v_Top = screen.availHeight / 2 - v_Height / 2 - 30;
        v_Left = screen.availWidth / 2 - v_Width / 2;
        v_Feature += "top=" + v_Top + ",";
        v_Feature += "left=" + v_Left + ",";
        v_Feature += "width=" + v_Width + ",";
        v_Feature += "height=" + v_Height + ",";
        if (i_Feature == null) {
            v_Feature += "directories=no,fullscreen=no,resizable=no,scrollbars=yes,status=1";
        } else {
            v_Feature += i_Feature;
        }
        objWindow = window.open(v_URL, v_WindowName, v_Feature);

        //objWindow=window.open (v_URL,v_WindowName,"directories=no,fullscreen=no,resizable=no,scrollbars=no,status=1");
        //v_Top=screen.availHeight/2-v_Height/2;
        //v_Left=screen.availWidth/2-v_Width/2;
        //objWindow.moveTo(v_Left,v_Top);
        //objWindow.resizeTo(v_Width,v_Height);
        objWindow.outerWidth = screen.availWidth;
        objWindow.outerHeight = screen.availHeight - 25;
    } else {
        objWindow.focus();
    }
    objWindow.focus();
}

//使用
openWindow(url,screen.width,screen.height);

```