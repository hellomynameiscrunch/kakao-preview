export default async (request, context) => {
  const IMAGE_1 = 'https://gcdnb.pbrd.co/images/XEoDA3fQj_mx.png';
  const IMAGE_2 = 'https://gcdnb.pbrd.co/images/mu8wcXJG_in0.png';

  // 50% 확률 생성
  const isImage2 = Math.random() < 0.5;
  const selectedImage = isImage2 ? IMAGE_2 : IMAGE_1;
  const title = isImage2 ? "🔴 [타입 B] 희귀 당첨!" : "🔵 [타입 A] 일반 공지";
  
  // 카카오 봇을 속이기 위한 매 초마다 바뀌는 난수 및 시간 생성
  const now = new Date();
  const timestamp = now.getTime();
  const gmtTime = now.toGMTString();
  const fakeETag = `W/"${Math.random().toString(36).substring(2, 15)}"`;

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <!-- 웹 표준 캐시 방지 메타 태그 (도배) -->
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0, s-maxage=0">
      <meta http-equiv="Pragma" content="no-cache">
      <meta http-equiv="Expires" content="0">
      
      <!-- OG 태그: 이미지 주소 뒤에도 계속 바뀌는 시간을 붙여 새 이미지로 위장 -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://kakaoview.netlify.app/">
      <meta property="og:title" content="${title} (${timestamp.toString().slice(-3)})">
      <meta property="og:description" content="실시간 갱신 중... 터치해서 확인하세요!">
      <meta property="og:image" content="${selectedImage}?burst=${timestamp}">
      <meta property="og:image:width" content="800">
      <meta property="og:image:height" content="400">

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
