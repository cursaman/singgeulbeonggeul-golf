const members = [
  { name: "김호원", nickname: "피닉스", role: "고문", phone: "010-3844-3033" },
  { name: "김태성", nickname: "젠틀", role: "회장", phone: "010-8157-0830" },
  { name: "이종춘", nickname: "커사맨", role: "방장", phone: "010-2869-7095" },
  { name: "최경수", nickname: "곰탱이", role: "부방장", phone: "010-7457-0256" },
  { name: "최정인", nickname: "날개", role: "부방장", phone: "010-5621-8365" },
  { name: "송종호", nickname: "투돌이", role: "", phone: "010-9611-4688" },
  { name: "최경점", nickname: "민들레", role: "", phone: "010-2740-7219" },
  { name: "배수경", nickname: "보름달", role: "", phone: "010-2857-3021" },
  { name: "문병식", nickname: "레인제로", role: "", phone: "010-8712-7102" },
  { name: "미입력", nickname: "해피나이스", role: "", phone: "010-9014-3966" },
];

const memberList = document.querySelector("#memberList");
memberList.innerHTML = members.map((member) => `
  <article class="member">
    <div>
      <strong>${member.nickname}${member.role ? `<span class="role">${member.role}</span>` : ""}</strong>
      <small>${member.name}</small>
    </div>
    <a class="phone" href="tel:${member.phone.replaceAll("-", "")}">${member.phone}</a>
  </article>
`).join("");

function saveSubmission(key, submission) {
  const saved = JSON.parse(localStorage.getItem(key) || "[]");
  saved.push({ ...submission, submittedAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(saved));
}

document.querySelector("#joinForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  saveSubmission("singgeul-join-requests", Object.fromEntries(new FormData(form)));
  form.reset();
  document.querySelector("#joinMessage").textContent = "등록 신청이 완료되었습니다.";
});

document.querySelector("#attendanceForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  saveSubmission("singgeul-attendance", Object.fromEntries(new FormData(form)));
  form.reset();
  document.querySelector("#attendanceMessage").textContent = "참석 신청이 완료되었습니다.";
});
