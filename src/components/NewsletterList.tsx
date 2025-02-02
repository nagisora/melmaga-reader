'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import NewsletterCard from '@/components/NewsletterCard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useUser } from '@/hooks/useUser';
import { Skeleton } from "@/components/ui/skeleton";
import { handleFirstLogin } from '@/lib/userUtils';

interface Newsletter {
  id: string;
  title: string;
  created_at: string;
  is_verified: boolean;
}

export function NewsletterList() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useUser();

  useEffect(() => {
    async function fetchNewslettersAndCheckFirstLogin() {
      if (!user) return;

      try {
        // ユーザーの is_first_login フラグを確認
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('is_first_login')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
        } else if (userData?.is_first_login) {
          await handleFirstLogin(user.id);
        }

        // 既存のメルマガ取得処理
        const { data, error } = await supabase
          .from('newsletters')
          .select(`
            id,
            title,
            created_at,
            reading_progress!left (
              is_verified
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching newsletters:', error);
          setError('メルマガの取得中にエラーが発生しました。');
          return;
        }

        const newsletters = data.map(item => ({
          id: item.id,
          title: item.title,
          created_at: item.created_at,
          is_verified: item.reading_progress?.[0]?.is_verified ?? false
        }));

        // 照合済みのメルマガを先頭に持ってくる
        const sortedNewsletters = newsletters.sort((a, b) => {
          if (a.is_verified && !b.is_verified) return -1;
          if (!a.is_verified && b.is_verified) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        setNewsletters(sortedNewsletters);
      } catch (error) {
        console.error('Error:', error);
        setError('データの取得中にエラーが発生しました。');
      }
    }

    if (user) {
      fetchNewslettersAndCheckFirstLogin();
    }
  }, [user]);

  if (loading) {
    return <Skeleton className="w-full h-24" />;
  }

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>ユーザーが認証されていません。ログインしてください。</AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (newsletters.length === 0) {
    return <div className="text-gray-600 dark:text-gray-400">メルマガはありません。</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {newsletters.map((newsletter) => (
        <NewsletterCard
          key={newsletter.id}
          id={newsletter.id}
          title={newsletter.title}
          createdAt={newsletter.created_at}
          isVerified={newsletter.is_verified}
        />
      ))}
    </div>
  );
}
