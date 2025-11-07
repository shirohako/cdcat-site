import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArtistsPage() {
  return (
    <ContentLayout title="艺术家">
      <Card>
        <CardHeader>
          <CardTitle>艺术家列表</CardTitle>
          <CardDescription>管理和浏览所有艺术家</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">艺术家功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
