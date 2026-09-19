export default async (request, context) => {
  const IMAGE_1 = 'https://gcdnb.pbrd.co/images/XEoDA3fQj_mx.png';
  const IMAGE_2 = 'https://gcdnb.pbrd.co/images/mu8wcXJG_in0.png';

  const isImage2 = Math.random() < 0.5;
  const selectedImage = isImage2 ? IMAGE_2 : IMAGE_1;
  const title = isImage2 ? "🔴 [타입 B] 당첨!" : "🔵 [타입 A] 당첨!";
  
  const now = new Date();
  const ts = now.getTime();
  const gmt = now.toGMTString();
  const nonce = Math.random().toString(36).substring(2, 10); // 랜덤 해시

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
  <!-- 로직 1: HTML 자체에 매번 바뀌는 랜덤 ID 부여 -->
  <head id="rand-${nonce}">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <!-- [HTML 메타 태그 폭격] -->
      <!-- 로직 2~6: 고전적인 캐시 금지 5종 세트 -->
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0, s-maxage=0, no-transform">
      <!-- 로직 7: HTTP 1.0 캐시 방지 -->
      <meta http-equiv="Pragma" content="no-cache">
      <!-- 로직 8: 만료 시간을 1970년으로 설정 (이미 만료됨) -->
      <meta http-equiv="Expires" content="Thu, 01 Jan 1970 00:00:00 GMT">
      <!-- 로직 9: 만료 시간을 0으로 설정 -->
      <meta http-equiv="Expires" content="0">
      <!-- 로직 10: 항상 페이지를 새로고침 하도록 유도 -->
      <meta http-equiv="refresh" content="0; url=https://kakaoview.netlify.app/?force=${ts}">
      
      <!-- [오픈그래프(OG) 꼼수 폭격] -->
      <!-- 로직 11: OG URL 자체를 속임 (카카오 봇에게 매번 다른 주소라고 구라침) -->
      <meta property="og:url" content="https://kakaoview.netlify.app/?v=${nonce}">
      <!-- 로직 12: 사이트 이름 매번 변경 -->
      <meta property="og:site_name" content="뽑기-${ts}">
      <meta property="og:type" content="website">
      <!-- 로직 13: 제목에 난수 삽입 -->
      <meta property="og:title" content="${title} (${nonce})">
      <!-- 로직 14: 설명에 초 단위 시간 삽입 -->
      <meta property="og:description" content="업데이트: ${gmt}">
      <!-- 로직 15: 이미지 URL 뒤에 타임스탬프 + 난수 합성 -->
      <meta property="og:image" content="${selectedImage}?t=${ts}&r=${nonce}">
      <!-- 로직 16~17: 이미지 사이즈를 미세하게 속여서 다른 이미지인 척 함 -->
      <meta property="og:image:width" content="${isImage2 ? '801' : '800'}">
      <meta property="og:image:height" content="${isImage2 ? '401' : '400'}">
      <!-- 로직 18: 업데이트 시간 강제 명시 -->
      <meta property="og:updated_time" content="${ts}">
      <!-- 로직 19: 기사 수정 시간 꼼수 사용 -->
      <meta property="article:modified_time" content="${gmt}">

      <title>${title} - ${ts}</title>
  </head>
  <body>
      <!-- 로직 20: 본문 내용도 바이트(Byte) 크기가 매번 달라지도록 쓰레기값(더미) 주입 -->
      <div style="display:none;" id="dummy-data">${'x'.repeat(Math.floor(Math.random() * 500))}</div>
      
      <div style="text-align: center; padding: 50px;">
          <h1>${title}</h1>
          <img src="${selectedImage}" style="max-width: 100%;">
          <p>코드: ${nonce}</p>
      </div>
  </body>
  </html>
  `;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      
      // [HTTP 헤더 폭격]
      // 로직 21~25: 현존하는 모든 Cache-Control 명령어 총동원
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0, no-transform, private",
      // 로직 26: 옛날 프록시 서버 캐시 방지
      "Pragma": "no-cache",
      // 로직 27: 이미 과거에 만료되었다고 선언
      "Expires": "Thu, 01 Jan 1970 00:00:00 GMT",
      // 로직 28: 최종 수정일을 현재 시간으로 계속 밀어붙임
      "Last-Modified": gmt,
      // 로직 29: 파일 고유 해시값(ETag)을 매번 랜덤으로 뱉어냄
      "ETag": `W/"${nonce}"`,
      // 로직 30: 접속 환경에 따라 무조건 다르다고 우김
      "Vary": "*",
      // 로직 31: 브라우저/서버에 남아있는 사이트 데이터 강제 삭제 명령
      "Clear-Site-Data": "\"*\"",
      // (보너스) 로직 32~34: 각종 CDN(클라우드플레어, 패스트리, 넷플리파이) 자체 캐시 무력화
      "Netlify-CDN-Cache-Control": "no-store",
      "CDN-Cache-Control": "no-store",
      "Surrogate-Control": "no-store"
    },
  });
};
      <title>${title}</title>
  </head>
  <body>
      <div style="text-align: center; padding: 50px;">
          <h1>${title}</h1>
          <p>이 페이지는 강제 캐시 파괴 기술이 적용되어 있습니다.</p>
          <img src="${selectedImage}" style="max-width: 100%; border-radius: 10px;">
      </div>
  </body>
  </html>
  `;

  // HTTP 응답 헤더에 캐시를 죽이는 모든 명령어를 때려 넣습니다.
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      
      // 1. 절대 저장하지 마라 (CDN, 브라우저, 봇 모두에게 명령)
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
      
      // 2. 과거의 유산 (HTTP 1.0 호환) 캐시도 죽임
      "Pragma": "no-cache",
      "Expires": "0",
      
      // 3. 서버 내용이 1초 전에 수정되었다고 카카오 봇에게 거짓말함
      "Last-Modified": gmtTime,
      
      // 4. 고유 식별자(ETag)를 매번 다르게 줘서 무조건 새 파일이라고 우김
      "ETag": fakeETag,
      
      // 5. 접속할 때마다 내용이 다르다고 선언
      "Vary": "*",
      
      // 6. 만약 저장해둔 게 있다면 당장 지워라 (최신 기술)
      "Clear-Site-Data": "\"*\"",
      
      // 7. Netlify 자체 캐시 서버 무력화
      "Netlify-CDN-Cache-Control": "no-store"
    },
  });
};
