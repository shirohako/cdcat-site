import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenresPage() {
  return (
    <ContentLayout title="音乐风格">
      <Card>
        <CardHeader>
          <CardTitle>音乐风格分类</CardTitle>
          <CardDescription>浏览和管理所有音乐风格</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">音乐风格功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
