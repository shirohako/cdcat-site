import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiscoverPage() {
  return (
    <ContentLayout title="发现音乐">
      <Card>
        <CardHeader>
          <CardTitle>发现新音乐</CardTitle>
          <CardDescription>探索和发现更多优质音乐</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">发现音乐功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
