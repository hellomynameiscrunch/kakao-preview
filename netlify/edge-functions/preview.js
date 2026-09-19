export default async (request, context) => {
  // 1. 유저가 접속한 '정확한 주소' 전체를 가져옴 (예: ?v=1 파라미터까지 전부)
  const currentUrl = request.url;

  const IMAGE_1 = 'https://gcdnb.pbrd.co/images/XEoDA3fQj_mx.png';
  const IMAGE_2 = 'https://gcdnb.pbrd.co/images/mu8wcXJG_in0.png';

  // 정확히 50% 반반 확률 계산
  const isImage2 = Math.random() < 0.5;
  const selectedImage = isImage2 ? IMAGE_2 : IMAGE_1;
  const title = isImage2 ? "🔴 [타입 B] 희귀 당첨" : "🔵 [타입 A] 일반 공지";
  const description = isImage2 ? "희귀/특수 이미지가 떴습니다! 확인해보세요." : "일반 이미지가 떴습니다.";

  // 2. 카카오톡 캐시 서버를 완벽히 부수기 위한 고유 숫자(현재 시간) 생성
  const timestamp = Date.now();
  const randomCode = timestamp.toString().slice(-4); // 눈으로 확인할 4자리 숫자

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <!-- ★ 핵심 1: 카카오톡에게 매번 다른 페이지라고 강제로 인식시킴 ★ -->
      <meta property="og:url" content="${currentUrl}">
      <meta property="og:type" content="website">
      
      <!-- ★ 핵심 2: 제목 뒤에 난수를 붙여서 갱신되는지 눈으로 확인 ★ -->
      <meta property="og:title" content="${title} (${randomCode})">
      <meta property="og:description" content="${description}">
      
      <!-- ★ 핵심 3: 이미지 주소 뒤에 난수를 붙여 카카오 이미지 캐시를 강제 무력화 ★ -->
      <meta property="og:image" content="${selectedImage}?t=${timestamp}">
      <meta property="og:image:width" content="800">
      <meta property="og:image:height" content="400">

      <title>${title}</title>
      <style>
          body { font-family: sans-serif; text-align: center; padding: 50px 20px; background-color: #f9f9f9; }
          .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: inline-block; max-width: 500px; width: 100%; }
          img { max-width: 100%; height: auto; border-radius: 8px; margin-top: 15px; }
      </style>
  </head>
  <body>
      <div class="card">
          <h1>${title}</h1>
          <p>${description}</p>
          <img src="${selectedImage}" alt="미리보기 이미지">
      </div>
  </body>
  </html>
  `;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      // Netlify 및 통신사 캐시를 영구 차단
      "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "pragma": "no-cache",
      "expires": "0"
    },
  });
};
