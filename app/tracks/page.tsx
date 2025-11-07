import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TracksPage() {
  return (
    <ContentLayout title="曲目">
      <Card>
        <CardHeader>
          <CardTitle>曲目列表</CardTitle>
          <CardDescription>管理和浏览所有曲目</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">曲目功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
