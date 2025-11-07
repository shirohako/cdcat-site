import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlbumsPage() {
  return (
    <ContentLayout title="专辑">
      <Card>
        <CardHeader>
          <CardTitle>专辑列表</CardTitle>
          <CardDescription>管理和浏览所有专辑</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">专辑功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
