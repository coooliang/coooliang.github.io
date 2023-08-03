# Git根据日期统计代码量

`转载` `2019-08-22 09:27:55`

https://blog.csdn.net/OONullPointerAlex/article/details/72772369

修改对应的日期

```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --since ==2019-04-21 --until==2017-05-21  --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 + $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done

```


