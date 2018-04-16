# mini ajax library

> NOTE: use to understand how ajax works, Do not use in production.
> 
> 

## set up interceptor

```
	// askData interceptor
    askData.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('x-access-token', token);
            xhr.setRequestHeader('Content-type', "application/json; charset=utf-8");
        },
        error : function(XHR) {
     		console.log(XHR);
            if (XHR.status === 401) {
                
            }
        },
        success: function (XHR) {
            console.log(XHR);
        }
    });

```

###使用
* get

```
askData.get('http://localhost:8090/api/bears')
    .success(function (data) {
      console.log(data);
    })
    .error(function (err) {
      console.log(err);
    });

```

* post

```
var params = {
  name: "elon musk"
};

askData.post('http://localhost:8090/api/bears', params)
    .success(function (data) {
      console.log(data);
    })
    .error(function (err) {
      console.log(err);
    });
```

* put

```
var params = {
  name: "elon musk"
};

askData.put('http://localhost:8090/api/bears/:bear_id', params)
    .success(function (data) {
      console.log(data);
    })
    .error(function (err) {
      console.log(err);
    });
```

* delete

```
askData.delete('http://localhost:8090/api/bears/:bear_id')
    .success(function (data) {
      console.log(data);
    })
    .error(function (err) {
      console.log(err);
    });
```

