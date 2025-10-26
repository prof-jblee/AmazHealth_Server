// server.js
import express from "express";

const app = express();
const PORT = 3000;

// 예: GET /number?value=123
app.get("/number", (req, res) => {
  const { value, timestamp } = req.query;

  // 유효성 검사
  if (!value || isNaN(value)) {
    return res.status(400).json({
      error: "유효한 숫자 값을 query parameter 'value'로 전달하세요.",
      example: "/number?value=42"
    });
  }

  // 숫자로 변환
  const stepCount = Number(value);
  const date = new Date(Number(timestamp));

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  console.log("날짜:", formatted);
  console.log("걸음 수:", stepCount);

  // 결과 응답
  res.json({
    message: "수신 성공",    
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
