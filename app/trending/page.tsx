import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrendingPage() {
  return (
    <ContentLayout title="热门榜单">
      <Card>
        <CardHeader>
          <CardTitle>热门音乐榜单</CardTitle>
          <CardDescription>查看当前最热门的音乐</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">热门榜单功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
