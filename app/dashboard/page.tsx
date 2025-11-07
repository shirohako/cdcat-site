import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <ContentLayout title="仪表盘">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总专辑数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% 较上月</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">艺术家数量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">+8% 较上月</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">曲目总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,678</div>
            <p className="text-xs text-muted-foreground">+15% 较上月</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">播放列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+5% 较上月</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>最近添加的专辑</CardTitle>
            <CardDescription>最近7天新增的专辑</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">暂无数据</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>热门艺术家</CardTitle>
            <CardDescription>播放量最高的艺术家</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">暂无数据</p>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
