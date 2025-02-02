import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">めるまぐ</CardTitle>
          <CardDescription className="text-center">メルマガ「週刊 Life is beautiful」専用アプリ<br />読み進めた位置を記録して続きから読める</CardDescription>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-col space-y-4">
            <Button asChild variant="outline">
              <Link href="/login">メールアドレスでログイン</Link>
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  または
                </span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2"
              asChild
            >
              <Link href="/auth/google">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Googleでログイン
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">新規登録</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
      <Card className="mt-4 p-4 border border-gray-300 rounded max-w-md mx-auto">
        <h3 className="text-lg font-semibold">ご案内</h3>
        <ul className="list-disc pl-5">
          <li>「週刊 Life is beautiful」未登録でも、テストメルマガが読めます。メルマガの著作権は、中島聡様、にあります。</li>
          <li>中島聡さんは、Windows95を開発した凄腕のエンジニアです。このメルマガが気になった方は、ぜひ
            <a href="https://www.mag2.com/m/0001323030" className="text-blue-500 font-bold underline">まぐまぐ</a>
            から登録して読んでみてください！</li>
          <li>Google Authが調子悪い場合は、メールアドレスでログインしてください。</li>
          <li>このアプリは<a href="https://connpass.com/event/331709/" className="text-blue-500 font-bold underline">Cursorハッカソン</a>の作品提出のために公開しています。ハッカソン終了後は非公開となります。</li>
        </ul>
      </Card>
    </div>
  );
}
