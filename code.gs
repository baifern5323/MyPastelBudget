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

// --- ฟังก์ชันใหม่: แก้ไขข้อมูล ---
function editData(formObject) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Transactions");
  
  // แปลง index อาร์เรย์ (เริ่ม 0) เป็นแถวใน Sheet (เริ่ม 1 และมี header 1 แถว -> +2)
  var rowIndex = parseInt(formObject.rowIndex) + 2;

  var dateStr = formObject.date; 
  var parts = dateStr.split("-"); 
  var year = parseInt(parts[0]) + 543;
  var month = parts[1];
  var day = parts[2];
  var thaiDate = day + "/" + month + "/" + year;

  // อัปเดตข้อมูล (คอลัมน์ 1-5)
  sheet.getRange(rowIndex, 1).setValue(thaiDate);
  sheet.getRange(rowIndex, 2).setValue(formObject.type);
  sheet.getRange(rowIndex, 3).setValue(formObject.category);
  sheet.getRange(rowIndex, 4).setValue(formObject.detail);
  sheet.getRange(rowIndex, 5).setValue(formObject.amount);

  return "แก้ไขข้อมูลเรียบร้อยแล้วค่ะ! ✨";
}

// --- ฟังก์ชันใหม่: ขอ URL ของ Sheet ---
function getSheetUrl() {
  return SpreadsheetApp.getActiveSpreadsheet().getUrl();
}

function getDataForDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Transactions");
  // ดึงข้อมูลทั้งหมดมาแสดง แล้วค่อยไป Filter วันที่ใน JavaScript ฝั่งหน้าบ้าน
  var data = sheet.getDataRange().getDisplayValues();
  data.shift(); // เอาหัวตารางออก
  return data;
}

function include(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .getContent();
}
