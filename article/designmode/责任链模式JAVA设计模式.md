# 责任链模式（Java设计模式）

`原创` `2014-01-07 17:26:24`

这是一个CMM短彩信发送功能中用到的责任链设计模式。

```java
public abstract class PushHandle {

	//下一次运行内容
	private PushHandle nextHandle;
	
	public PushHandle(PushHandle nextHandle){
		this.nextHandle = nextHandle;
	}
	public boolean sendPush(TaskPushMessage message){
		boolean r = handle(message);
		if(!r){
			if(nextHandle != null){
				nextHandle.sendPush(message);//关键代码
			}
		}
		return r;
	}
	protected abstract boolean handle(TaskPushMessage message);
}
```

```java
public class WapPushHandle extends PushHandle {
	
	public WapPushHandle(PushHandle nextHandle){
		super(nextHandle);
	}

	@Override
	protected boolean handle(TaskPushMessage message) {
		if(PUSHTYPE.WAPPUSH.getValue().equals(message.getTaskContent().getPushType())){
			List<String> phoneNumbers = new ArrayList<String>();
			for(TaskMember member : message.getTaskMembers()){
				phoneNumbers.add(member.getPhoneNumber());
			}
			Content content = ServiceFactory.getContentService().get(message.getTaskContent().getContentID()); 
			if(content != null){
				return PushSmsSender.sendWapPush(phoneNumbers, content.getContent(), "");
			}
		}
		return false;
	}

}
```

```java
public class MMSHandle extends PushHandle {
	
	public MMSHandle(PushHandle nextHandle){
		super(nextHandle);
	}

	@Override
	protected boolean handle(TaskPushMessage message) {
		// TODO Auto-generated method stub
		return true;
	}

}
```

```java
public class SMSHandle extends PushHandle {
	
	public SMSHandle(PushHandle nextHandle){
		super(nextHandle);
	}

	@Override
	protected boolean handle(TaskPushMessage message) {
		if(PUSHTYPE.SMS.getValue().equals(message.getTaskContent().getPushType())){
			List<String> phoneNumbers = new ArrayList<String>();
			for(TaskMember member : message.getTaskMembers()){
				phoneNumbers.add(member.getPhoneNumber());
			}
			Content content = ServiceFactory.getContentService().get(message.getTaskContent().getContentID()); 
			if(content != null){
				return PushSmsSender.sendMessage(phoneNumbers, content.getContent());
			}
		}
		return false;
	}

}
```

```java
public final class PushBuilder {

	private final static PushBuilder builder = new PushBuilder();
	private SMSHandle handle = null;
	
	private PushBuilder(){
		//初始化push业务
		WapPushHandle wapPush = new WapPushHandle(null);
		MMSHandle mms = new MMSHandle(wapPush);
		handle = new SMSHandle(mms);
	}
	
	/**
	 * 提取实例
	 */
	public static PushBuilder getInstance(){
		return builder;
	}
	
	/**
	 * 发送push业务
	 */
	public boolean pushHandle(TaskPushMessage message){
		return handle.sendPush(message);
	}
}
```
