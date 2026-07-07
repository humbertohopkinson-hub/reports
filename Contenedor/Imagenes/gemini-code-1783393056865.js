/**
 * Google Apps Script — Centralizador de Incidentes Help Desk (UTH)
 * Escucha las peticiones asíncronas POST enviadas mediante fetch() desde GitHub Pages.
 */

function doPost(e) {
  // Configuración del libro y la hoja destino obligatoria
  var sheetId = "1hRAE3KOZ0L3iQDaz-5eF0spMoQjqtO6_MG47AVm5I5A"; 
  var sheetName = "Historico de tickets";
  
  try {
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName(sheetName);
    
    // Si la hoja no existe de forma explícita, se crea
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        "ID_Ticket", "Fecha_Hora", "Nombre_Colaborador", "Correo_Institucional", 
        "Area_TI", "Prioridad_SLA", "Estado", "Descripcion_Tecnica", 
        "Tecnico_Asignado", "Tiempo_Resolucion_Min"
      ]);
    }
    
    // Extracción de parámetros enviados en el cuerpo del payload
    var data = JSON.parse(e.postData.contents);
    
    // Mapeo correlacional de las 10 variables obligatorias de TI
    sheet.appendRow([
      data.ID_Ticket || "N/D",
      data.Fecha_Hora || "N/D",
      data.Nombre_Colaborador || "N/D",
      data.Correo_Institucional || "N/D",
      data.Area_TI || "N/D",
      data.Prioridad_SLA || "N/D",
      data.Estado || "N/D",
      data.Descripcion_Tecnica || "N/D",
      data.Tecnico_Asignado || "N/D",
      data.Tiempo_Resolucion_Min || 0
    ]);
    
    // Retorno exitoso estructurado para el cliente web
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeader('Access-Control-Allow-Origin', '*');
                         
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "error": error.toString()}))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeader('Access-Control-Allow-Origin', '*');
  }
}

/**
 * Manejador de peticiones complementarias GET para verificación de enlace
 */
function doGet(e) {
  return ContentService.createTextOutput("Endpoint de Google Apps Script operando exitosamente.")
                       .setHeader('Access-Control-Allow-Origin', '*');
}