export const onRequest: PagesFunction = async (ctx) => {
  const req = ctx.request;
  const h = req.headers;
  const url = new URL(req.url);

  const cfIp = h.get("CF-Connecting-IP") || h.get("X-Forwarded-For") || "unknown";
  const ua   = h.get("User-Agent") || "-";
  const refH = h.get("Referer") || "-";               // ヘッダ由来（発火元＝あなたのページになる）
  const opened = url.searchParams.get("u") || "-";    // 開かれたページ
  const refQ = url.searchParams.get("r") || "";       // document.referrer由来（本当の流入元候補）
  const when = new Date().toISOString();

  console.log(`${when} IP=${cfIp} UA="${ua}" RefHeader="${refH}" URL="${opened}" ReferrerParam="${refQ}"`);
  return new Response("ok", { status: 200 });
};
