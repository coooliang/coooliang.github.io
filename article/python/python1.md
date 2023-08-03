# macOS多版本Python设置

`原创` `2021-02-25 11:30:45`

部分内容来自互联网 [Mac安装多个Python版本
](https://www.jianshu.com/p/3261976c10c2?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

```bash
#安装pyenv
brew install pyenv

#显示pyenv版本
pyenv -v

#显示pyenv版本列表
pyenv install --list

#使用brew安装wget
brew install wget

#安装pyenv
pyenv install 3.9.1

#查看版本
pyenv versions

#设置当前版本
pyenv global 3.9.1
python -V

#设置本地版本
pyenv local 3.9.1
python -V

#明明已经切换成功，但是用python -V却还是系统版本
export PYENV_ROOT=~/.pyenv
export PATH=$PYENV_ROOT/shims:$PATH
python -V
```

写入bash_profile文件

```bash
#打开文件
cd ~
open .bash_profile

#如果没有.bash_profile文件，进行创建
touch .bash_profile
open .bash_profile

#写入文件以下内容
export PYENV_ROOT=~/.pyenv
export PATH=$PYENV_ROOT/shims:$PATH

#保存
source ~/.bash_profile
```

#### PS:

```bash
#有时设置了pyenv local版本后，再设置global会发现没有生效，解除local设置
pyenv local --unset

#要切换回系统版本，用同样命令：
pyenv global system

#卸载python版本
pyenv uninstall 3.9.1

#查看pyenv指令列表
pyenv commands
```
