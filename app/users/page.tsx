import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <ContentLayout title="用户管理">
      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>管理系统用户</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">用户管理功能开发中...</p>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
