# Intent的初级学习

`原创` `2013-10-07 16:42:40`

Intent（意图）主要是解决Android应用的各项组件之间的通讯。

Intent负责对应用中一次操作的动作、动作涉及数据、附加数据进行描述，Android则根据此Intent的描述，负责找到对应的组件，将 Intent传递给调用的组件，并完成组件的调用。

> 例子1：

```java
// 打电话按钮
		Button intentButton = (Button) findViewById(R.id.intent_button1);
		intentButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent();
				intent.setAction(Intent.ACTION_CALL);
				intent.setData(Uri.parse("tel:15280063123"));
				startActivity(intent);
			}
		});

```

> 例子2：

```java
// 发短按钮
		Button sendButton = (Button) findViewById(R.id.intent_button_send);
		sendButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent();
				intent.setAction(Intent.ACTION_SENDTO);
				intent.setData(Uri.parse("smsto:5554"));
				intent.putExtra("sms_body", "hello!");
				startActivity(intent);
			}
		});
```