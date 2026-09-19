export default async (request, context) => {
  const NORMAL_IMAGE = 'https://gcdnb.pbrd.co/images/XEoDA3fQj_mx.png';
  const RARE_IMAGE = 'https://gcdnb.pbrd.co/images/mu8wcXJG_in0.png';

  // 10% 확률로 희귀 미리보기 당첨 (0.1 = 10%)
  const isRare = Math.random() < 0.1;

  const selectedImage = isRare ? RARE_IMAGE : NORMAL_IMAGE;
  const title = isRare ? "🎉 [대박!] 히든 희귀 미리보기가 등장했습니다!" : "📢 오픈채팅방 공지사항 링크";
  const description = isRare ? "이 미리보기를 캡처해서 인증하시면 특별 보상을 드립니다!" : "터치하여 공지 내용 및 웹사이트를 확인하세요.";

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <!-- 카카오톡 미리보기(OG) 설정 -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${selectedImage}">
      <meta property="og:image:width" content="800">
      <meta property="og:image:height" content="400">

      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
      <title>${title}</title>
      <style>
          body { font-family: sans-serif; text-align: center; padding: 50px 20px; background-color: #f9f9f9; }
          .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: inline-block; max-width: 500px; width: 100%; }
          img { max-width: 100%; height: auto; border-radius: 8px; margin-top: 15px; }
          .badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-weight: bold; margin-bottom: 10px; }
          .rare { background: #ffeaa7; color: #d63031; }
          .normal { background: #dfe6e9; color: #2d3436; }
      </style>
  </head>
  <body>
      <div class="card">
          <span class="badge ${isRare ? 'rare' : 'normal'}">
              ${isRare ? '★ 희귀 당첨 ★' : '일반 공지'}
          </span>
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
      "cache-control": "no-cache, no-store, must-revalidate",
    },
  });
};
