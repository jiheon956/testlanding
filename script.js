// ====== 카운트다운 타이머 ======
function updateCountdown() {
  const now = new Date();

  // 오늘 밤 23:59:59를 마감 시간으로 설정
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // 이미 오늘 마감이 지나면, 내일 밤으로 설정
  if (now > end) {
    end.setDate(end.getDate() + 1);
  }

  const diff = end - now;

  const totalSeconds = Math.floor(diff / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor((totalSeconds % 3600) / 60)
  ).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    countdownEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

// 1초마다 카운트다운 업데이트
setInterval(updateCountdown, 1000);
updateCountdown();

// ====== 최근 등록 현황으로 스크롤 ======
function scrollToRecent() {
  const recentSection = document.getElementById("recent");
  if (recentSection) {
    recentSection.scrollIntoView({ behavior: "smooth" });
  }
}
window.scrollToRecent = scrollToRecent;

// ====== 링크 공유 (복사) 기능 ======
document.addEventListener("DOMContentLoaded", function () {
  const shareBtn = document.getElementById("share-btn");
  const shareMsg = document.getElementById("share-success");

  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    const url = window.location.href;

    // 최신 브라우저: 클립보드 API 사용
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        if (shareMsg) {
          shareMsg.classList.add("visible");
          setTimeout(() => {
            shareMsg.classList.remove("visible");
          }, 2000);
        }
      } catch (e) {
        alert("링크 복사에 실패했습니다. 주소창의 주소를 직접 복사해주세요.");
      }
    } else {
      // 구형 브라우저용 fallback
      alert("주소창의 주소를 직접 복사해주세요.");
    }
  });
});
