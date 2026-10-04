import { CurrentDateTime } from "@/components/current-date-time";
import { JoinForm } from "@/components/join-form";
import { members } from "@/data/members";

const schedules = [
  { day: "화요일", time: "오전 9:30", fee: "12,000원", featured: true },
  { day: "토요일", time: "오전 10:00", fee: "16,000원" },
  { day: "토요일", time: "오후 1:00", fee: "16,000원" }
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="싱글벙글 홈">
          <span className="brand-ball" aria-hidden="true">⛳</span>
          <span>싱글벙글</span>
        </a>
        <CurrentDateTime />
        <nav aria-label="주요 메뉴">
          <a href="#schedule">정기모임</a>
          <a href="#members">회원</a>
          <a className="nav-cta" href="#join">가입하기</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div>
            <p className="eyebrow">SCREEN GOLF CLUB</p>
            <h1>함께 치고,<br /><em>함께 웃어요.</em></h1>
            <p className="hero-copy">실력은 달라도 즐거움은 함께!<br />편하게 만나 즐기는 스크린골프 동호회입니다.</p>
            <div className="hero-actions"><a className="button primary" href="#join">회원 등록하기</a></div>
          </div>
          <div className="next-meeting" aria-label="다음 정기모임 안내">
            <span>정기모임</span>
            <strong>매주 화요일 · 토요일</strong>
            <p>부담 없이 원하는 시간에 함께하세요.</p>
          </div>
        </section>

        <section className="section" id="schedule">
          <div className="section-heading">
            <p className="eyebrow">WEEKLY SCHEDULE</p>
            <h2>정기모임</h2>
            <p>참가비는 1회 기준입니다.</p>
          </div>
          <div className="schedule-grid">
            {schedules.map((schedule) => (
              <article className={`schedule-card${schedule.featured ? " featured" : ""}`} key={`${schedule.day}-${schedule.time}`}>
                <span className="day">{schedule.day}</span>
                <strong>{schedule.time}</strong>
                <p>{schedule.fee}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section field-section" id="field-meeting">
          <div className="field-card">
            <div className="field-card-heading">
              <div>
                <p className="eyebrow">FIELD MEETING</p>
                <h2>골프존카운티 더골프</h2>
                <p className="field-status"><span aria-hidden="true">✓</span> 예약 완료</p>
              </div>
              <div className="field-date">
                <strong>10.06</strong>
                <span>화요일</span>
              </div>
            </div>

            <div className="field-details">
              <div className="field-detail">
                <span>예약자</span>
                <strong>김태성</strong>
              </div>
              <div className="field-detail">
                <span>예약 팀</span>
                <strong>2팀</strong>
              </div>
              <div className="field-detail wide">
                <span>코스 및 티타임</span>
                <div className="tee-times">
                  <strong>ROCKY · 오전 6:40</strong>
                  <strong>ROCKY · 오전 6:47</strong>
                </div>
              </div>
              <div className="field-detail wide breakfast-detail">
                <span>식사 안내</span>
                <div className="meal-list">
                  <div className="breakfast-info">
                    <span aria-hidden="true">☀️</span>
                    <div>
                      <strong>아침식사</strong>
                      <p>각자 식사를 마치고 골프장으로 와주세요.</p>
                    </div>
                  </div>
                  <div className="breakfast-info lunch-info">
                    <span aria-hidden="true">🍽️</span>
                    <div>
                      <strong>점심식사</strong>
                      <p>점심 회비 20,000원이 필요합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-detail wide">
                <span>그린피 안내</span>
                <div className="fee-breakdown">
                  <div><small>총 그린피</small><strong>111,000원</strong></div>
                  <div><small>선입금</small><strong>5,000원</strong></div>
                  <div><small>당일 결제</small><strong>106,000원</strong></div>
                </div>
                <p className="payment-note">당일 잔액은 카별로 결제됩니다.</p>
              </div>
              <div className="field-detail wide prize-detail">
                <span>대회 상품</span>
                <div className="prize-list">
                  <div><span aria-hidden="true">🏆</span><p>최저타 우승<strong>롯데상품권 50,000원</strong></p></div>
                  <div><span aria-hidden="true">⛳</span><p>최다 파<strong>CJ 카드 20,000원</strong></p></div>
                  <div><span aria-hidden="true">🍠</span><p>참가자 행운 추첨<strong>고구마 1박스</strong></p></div>
                </div>
                <div className="personal-gifts">
                  <strong>참가자 전원 개인 지급</strong>
                  <span>3피스 골프공 1개</span>
                  <span>포카리 2개</span>
                </div>
              </div>
            </div>

            <div className="field-footer">
              <p>라운드 전에 티타임을 다시 한번 확인해 주세요.</p>
              <a className="button field-call" href="tel:0522400100">골프장 전화 052-240-0100</a>
            </div>
          </div>
        </section>

        <section className="section soft" id="members">
          <div className="section-heading row-heading">
            <div><p className="eyebrow">OUR MEMBERS</p><h2>싱글벙글 회원</h2></div>
            <span className="member-count">{members.length}명</span>
          </div>
          <div className="member-list">
            {members.map((member) => (
              <article className="member" key={member.phone}>
                <div>
                  <strong>{member.nickname}{member.role && <span className="role">{member.role}</span>}</strong>
                  <small>{member.name} · {member.gender}</small>
                </div>
                <a className="phone" href={`tel:${member.phone.replaceAll("-", "")}`}>{member.phone}</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section forms-section">
          <div className="form-card" id="join">
            <div className="section-heading">
              <p className="eyebrow">JOIN US</p>
              <h2>회원 등록</h2>
              <p>당근 모임에서 사용하는 닉네임을 정확히 적어주세요.</p>
            </div>
            <JoinForm />
          </div>
        </section>
      </main>

      <footer><strong>싱글벙글 스크린골프회</strong><span>실력은 달라도, 즐거움은 함께!</span></footer>
    </>
  );
}
