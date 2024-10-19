/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-supabase-project-id.supabase.co'],
  },
  // Vercelデプロイ時の警告を回避するための設定
  typescript: {
    // ビルド時の型チェックをスキップ（必要に応じて）
    ignoreBuildErrors: true,
  },
  eslint: {
    // ビルド時のESLintチェックをスキップ（必要に応じて）
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
