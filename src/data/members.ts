export type Member = {
  name: string;
  nickname: string;
  gender: "남" | "여" | "미입력";
  role?: string;
  phone: string;
};

export const members: Member[] = [
  { name: "김호원", nickname: "피닉스", gender: "남", role: "고문", phone: "010-3844-3033" },
  { name: "김태성", nickname: "젠틀", gender: "남", role: "회장", phone: "010-8157-0830" },
  { name: "이종춘", nickname: "커사맨", gender: "남", role: "방장", phone: "010-2869-7095" },
  { name: "최경수", nickname: "곰탱이", gender: "남", role: "부방장", phone: "010-7457-0256" },
  { name: "최정인", nickname: "날개", gender: "여", role: "부방장", phone: "010-5621-8365" },
  { name: "송종호", nickname: "투돌이", gender: "남", phone: "010-9611-4688" },
  { name: "최경점", nickname: "민들레", gender: "여", phone: "010-2740-7219" },
  { name: "배수경", nickname: "보름달", gender: "여", phone: "010-2857-3021" },
  { name: "문병식", nickname: "레인제로", gender: "남", phone: "010-8712-7102" },
  { name: "미입력", nickname: "해피나이스", gender: "여", phone: "010-9014-3966" },
  { name: "박현주", nickname: "다온", gender: "여", phone: "010-9291-3190" },
  { name: "김진철", nickname: "제로카73", gender: "남", phone: "010-6773-3787" },
  { name: "미입력", nickname: "서프로", gender: "남", phone: "010-3876-1711" }
];
