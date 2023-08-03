

 转自：

[http://topic.csdn.net/u/20100802/19/68f750ad-edad-4d36-95f5-2d6442c2cd85.html](http://topic.csdn.net/u/20100802/19/68f750ad-edad-4d36-95f5-2d6442c2cd85.html)

和

 [http://blog.sina.com.cn/s/blog_02b6f23d0100d3mm.html](http://blog.sina.com.cn/s/blog_02b6f23d0100d3mm.html)

选择其中一个足矣，我选择其中一个修改后供日常使用.

```java
/**
 * 用于对字符串进行MD5加密的工具类
 */
public class MD5Util {

	private MessageDigest md5 = null;
	private StringBuffer digestBuffer = null;
	private static MD5Util instance = new MD5Util();

	private MD5Util() {
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		digestBuffer = new StringBuffer();
	}

	/** 得到工具类的实例 */
	public static MD5Util getInstance() {
		return instance;
	}

	/**
	 * 接收字符串得到根据MD5加密后的字符串
	 * 
	 * @param 需要加密的字符串
	 * @return 返回加密后的字符串
	 */
	public String getMD5String(String s) {
		if (md5 != null) {
			digestBuffer.setLength(0);
			byte abyte0[] = md5.digest(s.getBytes());
			for (int i = 0; i < abyte0.length; i++)
				digestBuffer.append(toHex(abyte0[i]));
		}
		return digestBuffer.toString();
	}

	private String toHex(byte one) {
		String HEX = "0123456789ABCDEF";
		char[] result = new char[2];
		result[0] = HEX.charAt((one & 0xf0) >> 4);
		result[1] = HEX.charAt(one & 0x0f);
		String mm = new String(result);
		return mm;
	}
}
```


  

 

