import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  return (
    <ContentLayout title="账户设置">
      <Card>
        <CardHeader>
          <CardTitle>个人账户</CardTitle>
          <CardDescription>管理你的账户信息</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">账户设置功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
