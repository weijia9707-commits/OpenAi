/**
 * Cloudflare Worker - 社交媒体视频下载代理
 *
 * 使用免费的 Cobalt 社区实例，如果全部失败则返回外部服务链接
 * 免费额度：每天 100,000 次请求
 *
 * 更新实例列表：https://instances.cobalt.best/
 */

// Cobalt v7 社区实例（免费可用，按可靠性排序）
const COBALT_V7_INSTANCES = [
  'https://downloadapi.stuff.solutions/api/json',  // 已验证可用
];

// Cobalt v11 实例（可能需要认证，作为备用尝试）
const COBALT_V11_INSTANCES = [
  'https://cobalt-api.meowing.de/',
  'https://cobalt-backend.canine.tools/',
  'https://capi.3kh0.net/',
];

// 外部下载服务（兜底方案）
const EXTERNAL_SERVICES = {
  instagram: [
    { name: 'Cobalt', url: 'https://cobalt.tools/', icon: '⚡', desc: '开源、快速、支持高清' },
    { name: 'SnapSave', url: 'https://snapsave.app/zh/instagram-reels-video-download', icon: '💾', desc: '支持 Reels 和 Stories' },
    { name: 'FastDl', url: 'https://fastdl.app/zh/instagram-reels-downloader', icon: '🚀', desc: '快速下载' },
    { name: 'SaveInsta', url: 'https://saveinsta.io/zh', icon: '📥', desc: '备用选项' },
  ],
  facebook: [
    { name: 'Cobalt', url: 'https://cobalt.tools/', icon: '⚡', desc: '开源、快速、支持高清' },
    { name: 'SnapSave', url: 'https://snapsave.app/zh/facebook-video-downloader', icon: '💾', desc: '支持 Reels 和视频' },
    { name: 'FDown', url: 'https://fdown.net/zh/', icon: '📘', desc: '支持 HD 下载' },
    { name: 'SaveFrom', url: 'https://zh.savefrom.net/', icon: '📥', desc: '老牌下载服务' },
  ],
  youtube: [
    { name: 'Cobalt', url: 'https://cobalt.tools/', icon: '⚡', desc: '开源、快速、支持高清' },
    { name: 'Y2Mate', url: 'https://www.y2mate.com/zh-cn/youtube/', icon: '🎬', desc: '支持多种格式' },
    { name: 'SaveFrom', url: 'https://zh.savefrom.net/', icon: '📥', desc: '老牌下载服务' },
    { name: '9xbuddy', url: 'https://9xbuddy.com/', icon: '🎵', desc: '支持音频提取' },
  ],
};

// 通用 CORS 响应头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: { ...corsHeaders, 'Access-Control-Max-Age': '86400' },
      });
    }

    // 只允许 POST 请求
    if (request.method !== 'POST') {
      return jsonResponse({ error: '只支持 POST 请求' }, 405);
    }

    try {
      const body = await request.json();
      const { url, platform } = body;

      if (!url) {
        return jsonResponse({ error: '缺少 url 参数' }, 400);
      }

      // 1. 先尝试 v7 实例
      for (const instance of COBALT_V7_INSTANCES) {
        const result = await tryInstance(instance, url, platform, 'v7');
        if (result.success) {
          return jsonResponse(result);
        }
      }

      // 2. 再尝试 v11 实例
      for (const instance of COBALT_V11_INSTANCES) {
        const result = await tryInstance(instance, url, platform, 'v11');
        if (result.success) {
          return jsonResponse(result);
        }
      }

      // 3. 所有实例都失败，返回外部服务链接
      const services = EXTERNAL_SERVICES[platform] || EXTERNAL_SERVICES.instagram;
      return jsonResponse({
        success: true,
        platform: platform || 'unknown',
        isExternal: true,
        externalServices: services.map(s => ({
          ...s,
          url: s.url + '?url=' + encodeURIComponent(url),
        })),
      });

    } catch (error) {
      return jsonResponse({
        success: false,
        error: 'worker_error',
        message: error.message || '服务器内部错误',
      }, 500);
    }
  },
};

// 尝试单个 Cobalt 实例
async function tryInstance(instance, url, platform, version) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10秒超时

    const requestBody = version === 'v7'
      ? { url, vQuality: '1080', filenamePattern: 'pretty' }
      : { url, videoQuality: '1080', filenameStyle: 'pretty' };

    const response = await fetch(instance, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'video-proxy/1.0',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // 检查响应类型
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.log(`${instance}: 非 JSON 响应`);
      return { success: false };
    }

    const data = await response.json();

    // 检查认证错误
    if (data.status === 'error') {
      const errorCode = data.error?.code || '';
      if (errorCode.includes('auth') || errorCode.includes('jwt')) {
        console.log(`${instance}: 需要认证`);
        return { success: false };
      }
      console.log(`${instance}: ${errorCode}`);
      return { success: false };
    }

    // 成功 - 解析下载链接
    if (data.status === 'redirect' || data.status === 'stream' || data.status === 'tunnel') {
      return {
        success: true,
        platform: platform || 'unknown',
        status: data.status,
        downloadUrl: data.url,
        filename: data.filename || '视频',
        instance: instance,
      };
    }

    // Picker 模式（多个媒体）
    if (data.status === 'picker' && data.picker) {
      return {
        success: true,
        platform: platform || 'unknown',
        status: 'picker',
        picker: data.picker.map(item => ({
          type: item.type || 'video',
          url: item.url,
          thumb: item.thumb,
        })),
        instance: instance,
      };
    }

    return { success: false };

  } catch (error) {
    console.log(`${instance}: ${error.message}`);
    return { success: false };
  }
}

// JSON 响应辅助函数
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}
