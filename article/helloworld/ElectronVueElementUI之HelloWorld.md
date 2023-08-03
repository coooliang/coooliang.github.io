

```bash
sudo npm install @vue/cli -g
sudo npm install @vue/cli-service -g
sudo npm install -g electron

node -v
vue -V
electron -v
```


```bash
vue create vue-electron-demo
```



![./figures/023832fae83d4632a5ff9b81b6a4eb49.png](./figures/023832fae83d4632a5ff9b81b6a4eb49.png)


```bash
cd vue-electron-demo 
npm run serve
```



![./figures/ff1051f20c5c4fd0a455a434cfe3290c.png](./figures/ff1051f20c5c4fd0a455a434cfe3290c.png)
 添加Electron

```bash
sudo vue add electron-builder
```



![./figures/579ac33ab7e14ef8b31e417fe62ef19c.png](./figures/579ac33ab7e14ef8b31e417fe62ef19c.png)


运行electron

```bash
 npm run electron:serve
```



![./figures/db610a86ac7249c0b9f6777c405450ab.png](./figures/db610a86ac7249c0b9f6777c405450ab.png)


```bash
npm run electron:build
```


提示下载失败，貌似需要翻墙，vpn开全局多试一次可以了： ⨯ Get “https://github.com/electron/electron/releases/download/v13.6.3/electron-v13.6.3-darwin-x64.zip”: read tcp 172.20.10.2:62709->140.82.114.4:443: read: operation timed out 
![./figures/1aa1671351794356b1ed3d6e36300366.png](./figures/1aa1671351794356b1ed3d6e36300366.png)
 
![./figures/093ae95620fb4552b6056a857097379b.png](./figures/093ae95620fb4552b6056a857097379b.png)
 
![./figures/35c35a9f03904916b96563f02f84471e.png](./figures/35c35a9f03904916b96563f02f84471e.png)


添加ElementUI

```bash
vue add element
```



![./figures/79a17353241b476895a7c2b50637e03a.png](./figures/79a17353241b476895a7c2b50637e03a.png)
 报node-sass错误,vue2使用的才是elementui，vue3用的是element-plus

```bash
sudo vue add element-plus
```



![./figures/54f2669f4fd14e408843911ef90a72f7.png](./figures/54f2669f4fd14e408843911ef90a72f7.png)


[Element Plus](https://element-plus.org/zh-CN)

运行Electron报错 [https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported) 
![./figures/2d30a3c025324526af38ec29a67693b8.png](./figures/2d30a3c025324526af38ec29a67693b8.png)
 node17运行存在以上问题，node需要使用16版本

```bash
n 16.13.0
npm run electron:serve
```



![./figures/89d330e436264ab686e81ff8f16e6e8e.png](./figures/89d330e436264ab686e81ff8f16e6e8e.png)


