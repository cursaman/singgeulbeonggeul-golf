"use client";

import { FormEvent, useState } from "react";

type JoinRequest = {
  carrotNickname: string;
  name: string;
  golfzonNickname: string;
  phone: string;
  gender: string;
  age: string;
  privacy: boolean;
  submittedAt: string;
};

export function JoinForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const request: JoinRequest = {
      carrotNickname: String(formData.get("carrotNickname") ?? ""),
      name: String(formData.get("name") ?? ""),
      golfzonNickname: String(formData.get("golfzonNickname") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      gender: String(formData.get("gender") ?? ""),
      age: String(formData.get("age") ?? ""),
      privacy: formData.get("privacy") === "on",
      submittedAt: new Date().toISOString()
    };

    const key = "singgeul-join-requests";
    const saved = JSON.parse(window.localStorage.getItem(key) ?? "[]") as JoinRequest[];
    window.localStorage.setItem(key, JSON.stringify([...saved, request]));
    form.reset();
    setMessage("등록 신청이 완료되었습니다. 현재는 이 기기에만 임시 저장됩니다.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>당근 닉네임<input name="carrotNickname" required placeholder="예: 커사맨" /></label>
      <label>이름<input name="name" required placeholder="실명을 입력하세요" /></label>
      <label>골프존 닉네임<input name="golfzonNickname" required placeholder="골프존 닉네임" /></label>
      <label>휴대전화<input name="phone" required inputMode="tel" placeholder="010-0000-0000" pattern="010-[0-9]{4}-[0-9]{4}" /></label>
      <label>성별
        <select name="gender" required defaultValue="">
          <option value="" disabled>선택하세요</option>
          <option>남성</option>
          <option>여성</option>
          <option>선택 안 함</option>
        </select>
      </label>
      <label>나이<input name="age" required type="number" inputMode="numeric" min="18" max="100" placeholder="예: 45" /></label>
      <label className="check"><input name="privacy" type="checkbox" required /><span>회원 명단에 이름, 닉네임과 전화번호가 공개되는 것에 동의합니다.</span></label>
      <button className="button primary full" type="submit">등록 신청하기</button>
      <p className="form-message" role="status">{message}</p>
    </form>
  );
}
