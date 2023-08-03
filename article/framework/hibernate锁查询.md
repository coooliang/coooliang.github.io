# Hibernate 锁查询

`原创` `2011-12-01 12:02:13`

```java
action:
List<User> result = (List<User>) = dao.queryLock("from User po where id=?", LockMode.UPGRADE,"1");

dao:
public Object queryLock(final String hql, final LockMode lockMode, final Object... params) {
    return this.getHibernateTemplate().execute(new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException {
            Query query = session.createQuery(hql);
            for (int i = 0; i < params.length; i++) {
                query.setParameter(i, params[i]);
            }
            query.setLockMode("po", lockMode);
            return query.list();
        }
    });
}
```
