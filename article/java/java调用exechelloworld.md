# Java调用exec（HelloWorld）

`原创` `2013-08-24 12:48:02`

使用类库：**Apache Commons Exec**

http://commons.apache.org/proper/commons-exec/

apidoc命令为brew安装的文档生成工具

http://apidocjs.com/ 

for example:  

```java
package com.cooliang.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;

public class IOUtil {
	private static IOUtil instance = new IOUtil();

	private IOUtil() {
	}

	public static IOUtil getInstance() {
		return instance;
	}

	public boolean saveApiDoc(Map<String, Object> map) throws IOException {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		String folder = new File("").getAbsolutePath()+"/" +format.format(new Date());
		String filePath = folder + "/apidoc.json";
		createFile(filePath);
		File jsonFile = new File(filePath);
		
		CLFileWriter jsonWriter = new CLFileWriter(jsonFile);
		jsonWriter.writeLine("{");
		jsonWriter.writeLine("    \"name\":\"example\",");
		jsonWriter.writeLine("    \"version\": \"0.1.0\",");
		jsonWriter.writeLine("    \"description\": \"A basic apiDoc example\"");
		jsonWriter.writeLine("}");
		jsonWriter.flush();
		jsonWriter.close();

		File jsFile = new File(folder + "/example.js");
		jsFile.createNewFile();
		CLFileWriter jsWriter = new CLFileWriter(jsFile);
		jsWriter.writeLine("/**");
		jsWriter.writeLine("* @api {get} /user/:id Request User information");
		jsWriter.writeLine("* @apiName GetUser");
		jsWriter.writeLine("* @apiGroup User");
		jsWriter.writeLine("");
		jsWriter.writeLine("* @apiParam {Number} id Users unique ID.");
		jsWriter.writeLine("");
		jsWriter.writeLine("* @apiSuccess {String} firstname Firstname of the User.");
		jsWriter.writeLine("* @apiSuccess {String} lastname  Lastname of the User.");
		jsWriter.writeLine("");
		jsWriter.writeLine("* @apiSuccessExample Success-Response:");
		jsWriter.writeLine("*     HTTP/1.1 200 OK");
		jsWriter.writeLine("*     {");
		jsWriter.writeLine("*       \"firstname\": \"John\",");
		jsWriter.writeLine("*       \"lastname\": \"Doe\"");
		jsWriter.writeLine("*     }");
		jsWriter.writeLine("");
		jsWriter.writeLine("* @apiError UserNotFound The id of the User was not found.");
		jsWriter.writeLine("");
		jsWriter.writeLine("* @apiErrorExample Error-Response:");
		jsWriter.writeLine("");
		jsWriter.writeLine("*     HTTP/1.1 404 Not Found");
		jsWriter.writeLine("*     {");
		jsWriter.writeLine("*       \"error\": \"UserNotFound\"");
		jsWriter.writeLine("*     }");
		jsWriter.writeLine("*/");
		jsWriter.flush();
		jsWriter.close();
		
		File batFile = new File(folder+"/run.sh");
		batFile.createNewFile();
		CLFileWriter batWriter = new CLFileWriter(batFile);
		batWriter.writeLine("#!/bin/sh");
		batWriter.writeLine("export PATH=$PATH:/usr/local/bin");//防止 command not found
		batWriter.writeLine("apidoc -i "+folder+" -o "+folder+"/api-docs");
		batWriter.flush();
		batWriter.close();
		
		new DefaultExecutor().execute(CommandLine.parse("sh "+folder+"/run.sh"));
		new DefaultExecutor().execute(CommandLine.parse("open "+folder+"/api-docs/index.html"));
		
		return true;
	}
	public static void exec(String cmd){
		System.out.println(cmd);
		try {
			Runtime run = Runtime.getRuntime();//返回与当前 Java 应用程序相关的运行时对象
            Process p = run.exec(cmd);// 启动另一个进程来执行命令
            BufferedInputStream in = new BufferedInputStream(p.getInputStream());  
            BufferedReader inBr = new BufferedReader(new InputStreamReader(in));  
            String lineStr;  
            while ((lineStr = inBr.readLine()) != null)  
                //获得命令执行后在控制台的输出信息  
                System.out.println(lineStr);// 打印输出信息  
            //检查命令是否执行失败。  
            if (p.waitFor() != 0) {  
                if (p.exitValue() == 1)//p.exitValue()==0表示正常结束，1：非正常结束  
                    System.err.println("命令执行失败!");  
            }  
            inBr.close();  
            in.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
	}
	public static boolean createFile(String destFileName) {
		File file = new File(destFileName);
		if (file.exists()) {
			System.out.println("创建单个文件" + destFileName + "失败，目标文件已存在！");
			return false;
		}
		if (destFileName.endsWith(File.separator)) {
			System.out.println("创建单个文件" + destFileName + "失败，目标文件不能为目录！");
			return false;
		}
		// 判断目标文件所在的目录是否存在
		if (!file.getParentFile().exists()) {
			// 如果目标文件所在的目录不存在，则创建父目录
			System.out.println("目标文件所在目录不存在，准备创建它！");
			if (!file.getParentFile().mkdirs()) {
				System.out.println("创建目标文件所在目录失败！");
				return false;
			}
		}
		// 创建目标文件
		try {
			if (file.createNewFile()) {
				System.out.println("创建单个文件" + destFileName + "成功！");
				return true;
			} else {
				System.out.println("创建单个文件" + destFileName + "失败！");
				return false;
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("创建单个文件" + destFileName + "失败！" + e.getMessage());
			return false;
		}
	}

	public static boolean createDir(String destDirName) {
		File dir = new File(destDirName);
		if (dir.exists()) {
			System.out.println("创建目录" + destDirName + "失败，目标目录已经存在");
			return false;
		}
		if (!destDirName.endsWith(File.separator)) {
			destDirName = destDirName + File.separator;
		}
		// 创建目录
		if (dir.mkdirs()) {
			System.out.println("创建目录" + destDirName + "成功！");
			return true;
		} else {
			System.out.println("创建目录" + destDirName + "失败！");
			return false;
		}
	}

	public static String createTempFile(String prefix, String suffix, String dirName) {
		File tempFile = null;
		if (dirName == null) {
			try {
				// 在默认文件夹下创建临时文件
				tempFile = File.createTempFile(prefix, suffix);
				// 返回临时文件的路径
				return tempFile.getCanonicalPath();
			} catch (IOException e) {
				e.printStackTrace();
				System.out.println("创建临时文件失败！" + e.getMessage());
				return null;
			}
		} else {
			File dir = new File(dirName);
			// 如果临时文件所在目录不存在，首先创建
			if (!dir.exists()) {
				if (!createDir(dirName)) {
					System.out.println("创建临时文件失败，不能创建临时文件所在的目录！");
					return null;
				}
			}
			try {
				// 在指定目录下创建临时文件
				tempFile = File.createTempFile(prefix, suffix, dir);
				return tempFile.getCanonicalPath();
			} catch (IOException e) {
				e.printStackTrace();
				System.out.println("创建临时文件失败！" + e.getMessage());
				return null;
			}
		}
	}
}
```

```java
package com.cooliang.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class CLFileWriter extends FileWriter {

	public CLFileWriter(File file) throws IOException {
		super(file);
	}
	
	public void writeLine(String str) throws IOException {
        write(str, 0, str.length());
        write("\n");
    }

}
```
