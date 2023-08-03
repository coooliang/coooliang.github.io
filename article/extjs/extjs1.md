# 登陆 (EXTJS2.0.2)

`原创` `2011-12-09 16:27:48`

花了老子一天的时间，可见这东西有多麻烦啊。

不过对布局有了了解：在formPanel中的items中每一行为一个column,每一个column中又包含一个form布局的panel,

其中xtype : "textfield"不能设置为default，否则会显示不出textfield


```js
Ext.onReady(function() {
	// 表单提交执行的方法
	function doSubmit() {
		if (Ext.getCmp("reg_form").getForm().isValid()) {
			Ext.getCmp("reg_form").getForm().submit({
				url : 'user/userLogin.action',
				method : 'POST',
				waitTitle : '登陆中',
				waitMsg : '正在处理您的请求,请稍候...',
				success : function(form, action) {
					//location.href="跳转页面";
				},
				failure : function(form, action) {
					try {
						if (action.result.message == "0") {
							Ext.MessageBox.alert('提示', "登陆失败!");
						}
					} catch (e) {
						Ext.MessageBox.alert('提示',
								'对不起，您无法连接系统，如果您的网络正常，请联系系统管理员!');
					}
				}
			});
		}
	}
	Ext.QuickTips.init(); // 为组件提供提示信息功能，form的主要提示信息就是客户端验证的错误信息。
	Ext.form.Field.prototype.msgTarget = 'side';// 默认的堤示在文本框的右侧
	var reg_form = new Ext.FormPanel({
		id : "reg_form",
		width : 331,
		height : 166,
		frame : true,
		buttonAlign : 'center',
		labelAlign : 'right',
		labelWidth : 70,
		// anchor : '95%',
		defaults : {
			allowBlank : false,// 不可为空
			blankText : "该输入项不能为空"
		// xtype : "textfield"//注意：使用column时不能设置此项，否则label显示不出来.
		},
		items : [{// 第一行
			layout : "column",
			items : [{
				columnWidth : 1,// 第一列
				layout : "form",
				items : [{
					xtype : "textfield",
					fieldLabel : '用户名',
					name : 'user.username',
					regex : /[\u4e00-\u9fa5]/,
					regexText : "只能输入中文!",
					width : 200
				}]
			}]
		}, {
			layout : "column",
			items : [{
				columnWidth : 1,
				layout : "form",
				items : [{
					xtype : "textfield",
					fieldLabel : '密码',
					inputType : "password",// 密码
					name : 'user.password',
					regex : /^[a-zA-Z0-9]{6,20}$/,
					regexText : "6-20位字母和数字组合!",
					width : 200
				}]
			}]
		}, {
			layout : "column",
			items : [{
				columnWidth : .55,
				layout : "form",
				items : [{
					xtype : "textfield",
					fieldLabel : '验证码',
					id : "validateCode",
					name : 'user.validateCode',
					allowBlank : false,
					blankText : "必填!且为四位数字!",
					regex : /^[0-9]{4}$/,
					regexText : "必填!且为四位数字!",
					width : 70
				}]

			}, {
				columnWidth : .45,
				layout : "fit",
				items : [{
					xtype : "label",
					html : "<a href='javascript:reloadcode();'><img id='validataImg' src='common/userImg.jsp' /></a>"
				}]

			}]
		}],
		buttons : [{
			text : '登录',
			handler : doSubmit
		}, {
			text : '重置',
			handler : function() {
				Ext.MessageBox.confirm('提示信息', '当前数据将不会保存,您确定要取消吗?', function(
						btn) {
					if (btn == "yes") {
						Ext.getCmp("reg_form").getForm().reset();
					}
				});
			}
		}],
		keys : [{
			key : Ext.EventObject.ENTER,
			fn : doSubmit,
			scope : this
		}]

	});

	var _window = new Ext.Window({
		title : "用户登陆",
		width : reg_form.width,
		height : reg_form.height,
		// bodyStyle : 'padding:5px 5px 0',
		layout : "fit",
		closable : false,// 关闭按钮
		resizable : true,// 调整大小
		collapsible : true,
		draggable : true,// 是否可拖动
		// maximizable : true,// 最大,还原
		// minimizable : true,// 最小化
		modal : false,
		border : false,// panel是否显示边框
		items : [reg_form]
	});
	_window.show();
});
function reloadcode() {
	Ext.getDom('validataImg').setAttribute("src",
			'common/userImg.jsp?' + Math.random());
}
```

form.jsp

```jsp
	<head>
		<jsp:include page="common/extjshead.jsp"></jsp:include>
	</head>

	<body>
		out.println("{success : true,message : 'message'}");//流输出
		<br />
		< result name="input" type="json" >
		<br />
		<param name="includeProperties">success,message</param>
		<br />
		</result>
		<br />
		常用的Ext.form.Field.prototype.msgTarget有:under,qtip,side,title,
		<div id="formDiv"></div>
		<script type="text/javascript" src="appjs/form.js"></script>
	</body>
```

验证码的jsp

```jsp
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page contentType="image/jpeg" import="java.awt.*,java.awt.image.*,javax.imageio.*"%>
<%!   
  Color   getRandColor(int   fc,int   bc){//给定范围获得随机颜色   
                  Random   random   =   new   Random();   
                  if(fc>255)   fc=255;   
                  if(bc>255)   bc=255;   
                  int   r=fc+random.nextInt(bc-fc);   
                  int   g=fc+random.nextInt(bc-fc);   
                  int   b=fc+random.nextInt(bc-fc);   
                  return   new   Color(r,g,b);   
                  }   
  %><%   
  //设置页面不缓存   
  response.setHeader("Pragma","No-cache");   
  response.setHeader("Cache-Control","no-cache");   
  response.setDateHeader("Expires",   0);   
    
  //   在内存中创建图象   
  int   width=60,   height=20;   
  BufferedImage   image   =   new   BufferedImage(width,   height,   BufferedImage.TYPE_INT_RGB);   
    
  //   获取图形上下文   
  Graphics   g   =   image.getGraphics();   
    
  //生成随机类   
  Random   random   =   new   Random();   
    
  //   设定背景色   
  g.setColor(getRandColor(200,250));   
  g.fillRect(0,   0,   width,   height);   
    
  //设定字体   
  g.setFont(new   Font("Times   New   Roman",Font.PLAIN,18));   
    
  //画边框   
  //g.setColor(new   Color());   
  //g.drawRect(0,0,width-1,height-1);   
    
  //   随机产生155条干扰线，使图象中的认证码不易被其它程序探测到   
  g.setColor(getRandColor(160,200));   
  for   (int   i=0;i<155;i++){   
    int   x   =   random.nextInt(width);   
    int   y   =   random.nextInt(height);   
          int   xl   =   random.nextInt(12);   
          int   yl   =   random.nextInt(12);   
    g.drawLine(x,y,x+xl,y+yl);   
  }   
    
  //   取随机产生的认证码(4位数字)   
  String   sRand="";   
  for   (int   i=0;i<4;i++){   
          String   rand=String.valueOf(random.nextInt(10));   
          sRand+=rand;   
          //   将认证码显示到图象中   
          g.setColor(new   Color(20+random.nextInt(110),20+random.nextInt(110),20+random.nextInt(110)));   
  //调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成   
          g.drawString(rand,13*i+6,16);   
  }   
    
  //   将认证码存入SESSION   
  session.setAttribute("userRand",sRand);   
    
  //   图象生效   
  g.dispose();   
    
  //   输出图象到页面   
  ImageIO.write(image,   "JPEG",   response.getOutputStream());   
  out.clear();
  out = pageContext.pushBody();
%>

<%!
//取得随机字符
String getRandomValue(Random random)
{
	String mask = "2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";
	String[] masks = mask.split(",");
	return masks[random.nextInt(masks.length)];
}
%>
```

action或servlet返回的字符串为：{success:true,message:'helloworld!'}

当success为true时将走进doSubmit方法中的success，false将进入failsure方法。这里的success:function(){}并不是代表响应是否成功！