import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPlaylistPage() {
  return (
    <ContentLayout title="创建播放列表">
      <Card>
        <CardHeader>
          <CardTitle>新建播放列表</CardTitle>
          <CardDescription>创建一个新的播放列表</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">创建播放列表功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
