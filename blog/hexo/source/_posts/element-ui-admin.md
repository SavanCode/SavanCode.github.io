---
title: element ui admin 项目的小总结
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-16 15:52:34
password:
summary: element ui admin
tags: [elementUI,Vue,scss]
categories: Vue
---

## 在router页面检查用户权限

这里先设置meta中的roles 确定页面的权限

```js
//routerList.js
{
    name: 'home',
    path: '/home',
    meta: {
        isAuth: true,
        roles: ['student','admin'],
        title: '首页'
    },
    component: () => import('@/views/home/Home')
},
{
    name: 'bookList',
    path: '/bookList',
    meta: {
        isAuth: true,
        roles: ['admin'],
        title: '书库管理'
    },
    component: () => import('@/views/bookList/bookList')
},
```

设置router before each的检查(前面的check 基本的mata啥的记得要做哈) 然后对于权限的检查

```js
//router.js
// check token router内部跳转 检查账户身份
    checkTokenValid(user, token)
      .then(res => {
        if (res.ok && to.meta.roles.includes(role)) { 
          console.log("user",token)
          next();
        }else{
          // token ok & role bad & error
          console.log(res,to.meta.roles,role)
          MessageBox.confirm('此操作请登录管理员账户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              backToLogin();
            }).catch((error) => {  
            });
        }
      })
      .catch((err) => {
        console.log(err)
        backToLogin();
    })

```

## router 中使用 element ui

就是要import啊 别忘记了 

不然就出现类似`TypeError: $confirm is not a function`

## 表格的操作 -Avue 

### avue-crud表格进行增删改，新增时需对表单数据设置初值

```vue
<avue-crud :before-open="beforeOpen">
<script>
beforeOpen(done, type) {        
	if (["add"].includes(type)) {      
    	 //干活
         this.form.attribute = 'N';           
	}else if (["edit", "view"].includes(type)) {          
		//干活
	}        
	done();
}
</script>
```

解决方案：

1. this.form={releaseBy=:‘’}
2. 用settimeout包起来赋值的部分；（官方推荐）

```js
 beforeOpen(done, type) {       
                    //const { id } = this.$route.params;
                    //console.log(this.$route.params) 
                    if (["add"].includes(type)) {   
                        let data="default";
                        setTimeout(() => {
                        	this.$refs.crud.$children[0].searchForm[valueKey] = data;  
                            //this.$set(this.$refs['crud'].searchForm,'id',id)
                        }, 300);    
                        console.log("add")      
                    }else if (["edit", "view"].includes(type)) {          

                        console.log("edit view")            
                    }        
                    done();
                }, 
```

### avue filter

如果筛选无效 ，注意stringtype 因为dic 中 value 必须是string