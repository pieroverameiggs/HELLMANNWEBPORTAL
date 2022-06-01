<figure markdown>
  [![Login](./img/login/login.jpg){ align=center }](./img/login/login.jpg)
  <figcaption>Login</figcaption>
</figure>

## 1. :material-lock: Iniciar Sesión

Para acceder al [Customer Portal](http://192.168.10.150/WebCustomerPortal/login){:target="_blank"} completamos el formulario y hacemos clic en el botón **Iniciar Sesión**:

<figure markdown>
  [![Formulario Login](./img/login/form-login.jpg){ align=center }](./img/login/form-login.jpg)
  <figcaption>Formulario Login</figcaption>
</figure>

Los mensajes de respuesta pueden ser:

???+ success

    Si validación fue exitosa: **Nos enviara a la pantalla principal**

???+ warning

    Si ocurre una validación indicara: **Usuario o constraseña incorrecta y/o entidad no asignada**

???+ failure

    Si ocurre un error al validar indicara: **Servicio Suspendido Temporalmente :(**


## 2. :material-lock-off: Restablecer Contraseña

Para recuperar las credenciales del [Customer Portal](http://192.168.10.150/WebCustomerPortal/login){:target="_blank"}, hacemos clic en [¿Se te olvidó tu contraseña?](http://192.168.10.150/WebCustomerPortal/reset-password){:target="_blank"}, el cual no pedira completar el siguiente formulario, finalmente hacemos clic en el botón **Restablecer mi Contraseña**:

<figure markdown>
  [![Formulario Restablecer Contraseña](./img/login/reset-password.jpg){ align=center }](./img/login/reset-password.jpg)
  <figcaption>Formulario Restablecer Contraseña</figcaption>
</figure>

Los mensajes de respuesta pueden ser:

???+ success

    Si validación fue exitosa indicara: **Se envió un enlace de restablecimiento de contraseña a su Correo Electrónico**

???+ warning

    Si ocurre una validación indicara: **El Nombre de Usuario no Existe**

???+ failure

    Si ocurre un error al validar indicara: **Servicio Suspendido Temporalmente :(**

Si la respuesta fue exitoso, procedemos a revisar el correo en nuestra bandeja de entrada y hacemos clic en ^^**Link**^^:

<figure markdown>
  [![Correo Restablecer Contraseña](./img/login/link-reset-password.jpg){ align=center }](./img/login/link-reset-password.jpg)
  <figcaption>Correo Restablecer Contraseña</figcaption>
</figure>

Completamos el siguiente formulario para una nueva contraseña y hacemos clic en el botón **Cambiar mi Contraseña**:

<figure markdown>
  [![Formulario Nueva Contraseña](./img/login/new-password.jpg){ align=center }](./img/login/new-password.jpg)
  <figcaption>Formulario Nueva Contraseña</figcaption>
</figure>

Los mensajes de respuesta pueden ser:

???+ success

    Si validación fue exitosa indicara: **Se actualizó la contraseña correctamente**

???+ warning

    Si ocurre una validación indicara: **La contraseña ingresada no es segura**

???+ failure

    Si ocurre un error al validar indicara: 
    
    - **No se pudo actualizar su contraseña. Comunicar a Sistemas**
    - **Servicio Suspendido Temporalmente :(**