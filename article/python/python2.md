# macOS安装PaddleOCR

`原创` `2021-02-25 16:05:17`

[安装pyenv](https://blog.csdn.net/coooliang/article/details/114069073)

```bash
#安装完pyenv后，切换到3.7.x版本才可以安装paddle
pyenv global 3.7.10
pyenv local 3.7.10
python -V

#安装unrar
brew install carlocab/personal/unrar

#打印出64bit x86_64才可安装
python -c "import platform;print(platform.architecture()[0]);print(platform.machine())"

#升级pip
/Users/lion/.pyenv/versions/3.7.10/bin/python -m pip install --upgrade pip

#安装paddlepaddle
python -m pip install paddlepaddle -i https://mirror.baidu.com/pypi/simple

#git下载paddleOCR 
#https://github.com/PaddlePaddle/PaddleOCR

cd PaddleOCR-develop
pip install -r requirements.txt
```

vscode中查看是否成功：

```python
import paddle

paddle.utils.run_check()
```