<?
 // session_name('ui_geo');
 // session_start();
 // require_once('funciones.php');
 // comprobar($_SESSION['s_usuarioreg']['usu']);
 $archivo = $_GET['nombre'];
?>

<html>
<head>
<meta http-equiv="Content-Language" content="es-ar">
<link rel="stylesheet" type="text/css" href="archivos/estilos/ui_geodesia.css">
<title>Visualización de Planos</title>


<!--
IMPORTANTE ACA ESTAN LAS RESTRICCIONES PARA LA VISUALIZACION
-->


<script language="Javascript">
function ShowCommand(cmdName, bShow){
 var PageViewer = ADViewer.Viewer;
 PageViewer.ShowCommand(cmdName, bShow);
}
</script>

<?php
  $ Sys = {};
  $ ua = navigator.userAgent.toLowerCase();
  $ s;
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
  if(Sys.ie){
 	 

		<script type="text/javascript" FOR="ADViewer" EVENT="OnEndLoadItem(bstrItemName,vData,vResult)">
		  if(bstrItemName == "SHEET")
		  {
		  ShowCommand("PRINT",false)
		  ShowCommand("SAVE", false)
		  ShowCommand("SAVEAS",false)
		  ShowCommand("CONTEXTMENU",false)
		  }
		</script>

		<!-- plugin para IE -->
		<object id = "ADViewer"  
		classid = "clsid:A662DA7E-CCB7-4743-B71A-D817F6D575DF"
		border = "1" width = "75%" height = "90%">
		<param name = "Src" value=<? echo $archivo; ?>>
		<param name="ToolbarVisible" value="False">
		</object>
		<br>
 	  		
 else
  {
  
    <!-- Hide IE OBJECT. -->
    <script type="text/javascript">
      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();
      var s;
      (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
      if (!Sys.ie)
      {
       document.getElementById("IEOBJECT").style.width= 0;
       document.getElementById("IEOBJECT").style.height= 0;
      }
    </script>
<!-- plugin para firefox-->
	<object id="ADViewer" type="application/x-Autodesk-DWF" border="1" width="100%" height="100%">
	<param name = "dwffilename" value=<? echo $archivo; ?>>
	<param name="ToolbarVisible" value="False">
	</object>
  <script type="text/javascript" FOR="ADViewer" EVENT="OnEndLoadItem(ItemName,Data,Result)">
  // ####################################
  // Event for type of DWF loaded
  // ####################################
    if (ItemName == "SECTION")
      FillContent()
      
    if (ItemName == "VIEWER")
    {
      //Turn off all the UI
      Commands = ADViewer.ECompositeViewer.Commands;
      Commands('TOOLBAR').Toggled = false; // hide standard toolbar
      Commands('ANIMATIONBAR').Toggled = false; // hide Animation bar
      Commands('DATAFRAMEUI').Toggled = false; // hide data pane
      Commands("GRIDROLLOVER").Toggled = false; // hide the grid roll over (up arrow)
      Commands("CANVASTITLE").Toggled = false; // hide canvas title bar         
    }
  }
  ?>
<br>
</body>
</html>
