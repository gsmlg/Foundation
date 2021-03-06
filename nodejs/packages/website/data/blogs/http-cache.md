# HTTP 缓存控制

HTTP 协议是 WWW 的通讯协议，用于处理互联网上成百上千的应用请求

HTTP 中的缓存是非常重要的，线上服务可以处理成千上万的请求，很大程度上，都依赖缓存

HTTP 协议中定义了在 HTTP 请求中如何缓存数据

## Expires 响应头

指定内容缓存失效时间

```
# Expires: <http-date>
# Exampale
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```

表明缓存可以保存的时间，如果当前时间早于这个时间，那么可以使用缓存的副本，可以不向服务器再次请求

## Cache-Control 响应头

### `max-age`

指定缓存生存时间

示例：

```
Cache-Control: max-age=3600
```

表示当收到响应后，在 3600 秒内，如果再次请求数据，可以使用缓存的副本，不需要再次向服务器请求数据

### `public`

表示这是一个开放资源，可以进行缓存

### `private`

表示这是一个私有资源，代理服务器不得缓存

### `must-revalidate`

当发生请求时，必须向服务器再次验证数据

## 验证数据相关响应头

### `Etag`

用于验证当前数据的内容版本的标示符

这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web 服务器不需要发送完整的响应。而如果内容发生了变化，使用 ETag 有助于防止资源的同时更新相互覆盖（“空中碰撞”）。

如果给定 URL 中的资源更改，则一定要生成新的 Etag 值。 因此 Etags 类似于指纹，也可能被某些服务器用于跟踪。 比较 etags 能快速确定此资源是否变化，但也可能被跟踪服务器永久存留。

```
ETag: W/"<etag_value>"
ETag: "<etag_value>"
```

- /W
  'W/'(大小写敏感) 表示使用弱验证器。 弱验证器很容易生成，但不利于比较。 强验证器是比较的理想选择，但很难有效地生成。 相同资源的两个弱 Etag 值可能语义等同，但不是每个字节都相同。

- "<etag_value>"
  实体标签唯一地表示所请求的资源。 它们是位于双引号之间的 ASCII 字符串（如“675af34563dc-tr34”）。

#### 避免“空中碰撞”

在 `ETag` 和 `If-Match` 头部的帮助下，可以检测到"空中碰撞"的编辑冲突。

在 `POST` 请求头中包含 `If-Match` 头来检查是否最新版本。

```
If-Match: "33a64df551"
```

如果哈希值不匹配，则发送 412 前提条件失败错误

#### 缓存未更改的资源

当用户再次请求对应资源时，会携带`if-none-match`头来

```
If-None-Match: "33a64df551"
```

服务器收到后，检查是否和当前`etag`匹配，如果相同，则发送 304 响应，不包含任何内容，标示客户端可以使用缓存数据

### `last-modified`

包含源头服务器认定的资源做出修改的日期及时间。

它通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。由于精确度比 `ETag` 要低，所以这是一个备用机制。

```
Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
```

- `<day-name>`
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" 或 "Sun" 之一 （区分大小写）。
- `<day>`
  两位数字表示的天数, 例如"04" or "23"。
- `<month>`
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 之一（区分大小写）。
- `<year>`
  4 位数字表示的年份, 例如 "1990" 或者"2016"。
- `<hour>`
  两位数字表示的小时数, 例如 "09" 或者 "23"。
- `<minute>`
  两位数字表示的分钟数，例如"04" 或者 "59"。
- `<second>`
  两位数字表示的秒数，例如 "04" 或者 "59"。
- `GMT`
  国际标准时间。HTTP 中的时间均用国际标准时间表示，从来不使用当地时间。

#### 避免“空中碰撞”

在 `Last-Modified` 和 `If-Unmodified-Since` 头部的帮助下，可以检测到"空中碰撞"的编辑冲突。

在 `POST` 请求头中包含 `If-Unmodified-Since` 头来检查是否最新版本。

```
If-Unmodified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
```

如果请求资源在时间之后做了修改，则返回 412 前提条件失败错误

#### 缓存未更改的资源

当用户再次请求对应资源时，会携带`If-Modified-Since`头来匹配资源，如果在给定日期后做了修改，则需要正常响应

```
If-Modified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
```

服务器收到后，检查是否和当前`If-Modified-Since`时间，如果在给定日期后没有修改，则发送 304 响应，不包含任何内容，标示客户端可以使用缓存数据
