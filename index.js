// server.js
import express from "express";

const app = express();
const PORT = 3000;

// 예: GET /number?value=123
app.get("/number", (req, res) => {
  const { timestamp, step_count, light, heartrate, score, startTime, endTime, sleepLength, totalTime } = req.query;

  // 유효성 검사
  if (!step_count || isNaN(step_count) || !light || isNaN(light) || !heartrate || isNaN(heartrate) ||
      !score || isNaN(score) || !sleepLength || isNaN(sleepLength) || !startTime || isNaN(startTime) ||
      !endTime || isNaN(endTime) || !totalTime || isNaN(totalTime)) {
    return res.status(400).json({
      error: "유효한 숫자 값을 query parameter 'step_count'로 전달하세요.",
      example: "/number?step_count=42"
    });
  } 

  // 숫자로 변환
  const stepCount = Number(step_count);
  const light_lux = Number(light);
  const hr = Number(heartrate);
  const sleep_score = Number(score);  
  const onset_time = Number(startTime);
  const offset_time = Number(endTime);
  const sleep_length = Number(sleepLength);
  const time_in_bed = Number(totalTime);  
  const date = new Date(Number(timestamp));    

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  console.log(`날짜: ${formatted}, 걸음 수: ${stepCount}, 조도: ${light_lux}, 심박수: ${hr}
수면점수: ${sleep_score}, 수면시간: ${sleep_length}, 총 수면시간: ${time_in_bed}
입면시각: ${onset_time}, 기상시각: ${offset_time}`);

  // 결과 응답
  res.json({
    message: "수신 성공",    
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
