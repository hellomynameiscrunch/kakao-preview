export default async (request, context) => {
  const IMAGE_1 = 'https://gcdnb.pbrd.co/images/XEoDA3fQj_mx.png';
  const IMAGE_2 = 'https://gcdnb.pbrd.co/images/mu8wcXJG_in0.png';

  // Math.random() < 0.5 는 정확히 50% (반반) 확률입니다.
  const isImage2 = Math.random() < 0.5;

  const selectedImage = isImage2 ? IMAGE_2 : IMAGE_1;
  const title = isImage2 ? "🔴 [타입 B] 미리보기" : "🔵 [타입 A] 미리보기";
  const description = isImage2 ? "희귀/특수 이미지가 걸렸습니다!" : "일반 이미지가 걸렸습니다!";

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <!-- 카카오톡 Open Graph 메타 태그 -->
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
      // 서버 및 CDN 캐시 완전 차단
      "cache-control": "no-cache, no-store, must-revalidate, max-age=0",
      "netlify-cdn-cache-control": "no-store",
    },
  });
};
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
