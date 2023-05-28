# 2023spring_41class_team6
 소프트웨어공학개론 6조 Repository

# 킹고포털 계정 로그인 방법
login.skku/edu/loginAction에 POST Request
JSON 형식은 {"lang":"ko", "userid": "사용자아이디", "userpwd":"사용자비밀번호Base64인코딩"}
로그인에 실패해도 Response Code 200은 받아오나 Response body에 returnCode가 "failure"로 오게 된다.
로그인에 성공시 returnCode "success"로 오게된다. 특별히 쿠키 처리 과정은 구현 안 해도 될 것 같으며 returnCode를 "success"로 받아올 시 채팅 화면으로 넘어가는 것으로 하면 될 것 같다.