import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <ContentLayout title="系统设置">
      <Card>
        <CardHeader>
          <CardTitle>系统设置</CardTitle>
          <CardDescription>配置系统参数</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">系统设置功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
