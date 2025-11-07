import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlaylistsPage() {
  return (
    <ContentLayout title="播放列表">
      <Card>
        <CardHeader>
          <CardTitle>所有播放列表</CardTitle>
          <CardDescription>管理和浏览所有播放列表</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">播放列表功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
