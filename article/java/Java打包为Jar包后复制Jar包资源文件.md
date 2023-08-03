# Java打包为Jar包后复制Jar包资源文件

`原创` `2017-09-16 17:41:21`

场景：最近做了一个swing项目，有一个功能是通过用户配置的内容动态创建html页面，**此时我将css,js等样式文件放到src目录下**，常规的方法直接运行程序没有问题，但是打包成jar包后出现无法复制jar包内的资源文件到外部的情况。现已通过以下方法处理，还没有想到更好的办法

1. 我写了一个file.list的文件目录，里面包含了需要复制的资源文件的相对路径



```java
private static void printFile(File file) {
	// 如果是目录
	if (file.isDirectory()) {
		File[] files = file.listFiles();
		// 遍历目录下的全部文件
		for (File temp : files) {
			printFile(temp);
		}
	}else{
		System.out.println(file.getAbsolutePath());
	}
}
```

2. IO流读取这个目录文件再一个个复制到外部，使用的是getResourceAsStream方法，这里要用buff的方式否则会出现文本最后出现乱码的问题

```java
String apiFileListString = propertiesUtil.readProperty("api");
	String[] fileList = apiFileListString.split(",");
	if (fileList != null && fileList.length > 0) {
		for (String filePath : fileList) {
			InputStream inputStream = IOUtil.class.getResourceAsStream(filePath);
			filePath = filePath.replace("/resources", "");
			String newFileString = folderPath + filePath;

			createFile(newFileString, true);

			FileOutputStream outputStream = null;
			try {
				outputStream = new FileOutputStream(new File(newFileString),false);
						byte buff[]  = new byte[1024];
						int len = 0;  
						while(0<=(len=inputStream.read(buff))){  
								outputStream.write(buff, 0, len);  
						}  
				outputStream.flush();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (outputStream != null) {
					try {
						outputStream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				if (inputStream != null) {
					try {
						inputStream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
```

```java
private static boolean createFile(String destFileName) {
		return createFile(destFileName, false);
	}

	private static boolean createFile(String destFileName, boolean onlyFolder) {
		File file = new File(destFileName);
		if (file.exists()) {
			String msg = "创建单个文件" + destFileName + "失败，目标文件已存在！";
			logger.debug(msg);
			return false;
		}
		if (destFileName.endsWith(File.separator)) {
			String msg = "创建单个文件" + destFileName + "失败，目标文件不能为目录！";
			logger.error(msg);
			return false;
		}
		// 判断目标文件所在的目录是否存在
		if (!file.getParentFile().exists()) {
			// 如果目标文件所在的目录不存在，则创建父目录
			logger.error("目标文件所在目录不存在，准备创建它！");
			if (!file.getParentFile().mkdirs()) {
				logger.error("创建目标文件所在目录失败！");
				return false;
			}
		}
		if (!onlyFolder) {
			// 创建目标文件
			try {
				if (file.createNewFile()) {
					logger.debug("创建单个文件" + destFileName + "成功！");
					return true;
				} else {
					logger.error("创建单个文件" + destFileName + "失败！");
					return false;
				}
			} catch (IOException e) {
				e.printStackTrace();
				logger.error("创建单个文件" + destFileName + "失败！" + e.getMessage());
				return false;
			}
		}
		return true;
	}
```

3. 通过读filelist.properties中的路径列表 ，一个个文件通过IO流复制到外部。

filelist.properties: 
```properties
api=/resources/api/others/css/bg.png,/resources/api/others/css/c5.css,/resources/api/others/css/favicon.ico,/resources/api/others/js/jquery.min.js,/resources/api/others/js/main.js
```
