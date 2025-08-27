// Cloudflare Pages Functions: /functions/log.ts → /log で実行
export const onRequest: PagesFunction = async (ctx) => {
  const req = ctx.request;
  const h = req.headers;

  // Cloudflareが付与するクライアントIP（最優先）
  const cfIp = h.get("CF-Connecting-IP"); // 公式ドキュメント
  // 互換ヘッダも一応見ておく
  const xff  = h.get("X-Forwarded-For");
  const ua   = h.get("User-Agent") || "-";
  const ref  = h.get("Referer") || "-";

  // 開かれたURL（クエリ ?u=）
  const url = new URL(req.url);
  const opened = url.searchParams.get("u") || "-";

  // タイムスタンプはUTCで
  const when = new Date().toISOString();

  // ダッシュボード > Workers & Pages > Pages > 対象デプロイ > Functions で見える
  console.log(`${when} IP=${cfIp || xff || "unknown"} UA="${ua}" Referer="${ref}" URL="${opened}"`);

  return new Response("ok", { status: 200 });
};
