# SSH下载git项目

`原创` `2023-09-18 10:37:35`

```ssh
ssh-keygen -t rsa

Generating public/private rsa key pair.
Enter file in which to save the key (/Users/lion/.ssh/id_rsa): 
/Users/lion/.ssh/id_rsa already exists.
Overwrite (y/n)? n
lion@liondeiMac .ssh % ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/lion/.ssh/id_rsa): github
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in github
Your public key has been saved in github.pub
The key fingerprint is:
SHA256:ja8WsIQxhxCNdOl9FE0XCIez9OKvlbsPvPXTgd65rRw lion@liondeiMac.local
The key's randomart image is:

```

```
lion@liondeiMac .ssh % ls                 
cibdev		config		github.pub	id_rsa.pub	known_hosts.old	sshkey.pub
cibdev.pub	github		id_rsa		known_hosts	sshkey

lion@liondeiMac .ssh % cat github.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQA...5ktNsLMj7GLUAb9CdjNrep1xGjc5EygvYL8= lion@liondeiMac.local
```
 
