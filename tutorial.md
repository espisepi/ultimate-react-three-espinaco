- Para subir los videos a aws s3: Crear bucket, darle permiso acceso "Todo el mundo (acceso público)" en lectura en objetos y acl del objeto, y en cors poner la siguiente configuracion sacada de aqui https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html :

[
{
"AllowedHeaders": [
"*"
],
"AllowedMethods": [
"GET",
"PUT",
"POST",
"DELETE"
],
"AllowedOrigins": [
"https://www.sepinaco.com"
],
"ExposeHeaders": []
},
{
"AllowedHeaders": [],
"AllowedMethods": [
"GET"
],
"AllowedOrigins": [
"*"
],
"ExposeHeaders": []
}
]
