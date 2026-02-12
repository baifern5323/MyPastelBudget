function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('My Pastel Budget');
}

function saveData(formObject) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Transactions");
  
  var dateStr = formObject.date; 
  var parts = dateStr.split("-"); 
  var year = parseInt(parts[0]) + 543;
  var month = parts[1];
  var day = parts[2];
  var thaiDate = day + "/" + month + "/" + year;

  sheet.appendRow([
    thaiDate,            
    formObject.type,
    formObject.category,
    formObject.detail,
    formObject.amount,
    Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss") 
  ]);
  
  return "บันทึกข้อมูลเรียบร้อย (พ.ศ. " + year + ") ค่า! 💖";
}

function getDataForDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Transactions");
  var data = sheet.getDataRange().getDisplayValues();
  data.shift(); 
  return data;
}

// --- เพิ่มฟังก์ชันนี้เข้าไปครับ สำคัญมาก! ---
function include(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .getContent();
}
