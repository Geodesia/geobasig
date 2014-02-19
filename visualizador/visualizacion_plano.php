<?
 // session_name('ui_geo');
 // session_start();
 // require_once('funciones.php');
 
 // comprobar($_SESSION['s_usuarioreg']['usu']);
 $archivo = $_GET['nombre'];
 //LO DE ARRIBA NO LO MIRES
?>
<html>
<head>
<meta http-equiv="Content-Language" content="es-ar">
<link rel="stylesheet" type="text/css" href="archivos/estilos/ui_geodesia.css">
<title>Visualización de Planos</title>
 
 <!-- ESTA ES LA PARTE IMPORTANTE
 -->
 
<br>
<center>
<object id = "ADViewer"  
classid = "clsid:A662DA7E-CCB7-4743-B71A-D817F6D575DF"
border = "1" width = "75%" height = "90%">
<param name = "Src" value=<? echo $archivo; ?>>
</object>
<br>
</center>
</body>
</html>
