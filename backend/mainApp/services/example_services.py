from models.model import db, User
from typing import List
from models.forms import RegisterForm, LoginForm
from flask import session

def login(data):
    form = LoginForm() #로그인 폼 생성
    if form.validate_on_submit(): #유효성 검사
        session['userid'] = form.data.get('userid') #form에서 가져온 userid를 session에 저장
        return "로그인 성공"
            
    return "로그인 실패"

def register_user(data):
    form = RegisterForm()
    if form.validate_on_submit(): # POST검사의 유효성검사가 정상적으로 되었는지 확인할 수 있다. 입력 안한것들이 있는지 확인됨.
        #비밀번호 = 비밀번호 확인 -> EqulaTo
    
        user = user()  #models.py에 있는 user 
        user.userid = form.data.get('userid')
        user.username = form.data.get('username')
        user.password = form.data.get('password')
            
        print(user.userid,user.password)  
        db.session.add(user)  
        db.session.commit() 
        
        return "가입 완료" 