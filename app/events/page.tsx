"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useEvents } from "@/hooks/api";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/types/models";

// Group events by year for chronological view
function groupEventsByYear(events: Event[]) {
  if (!events || events.length === 0) return {};

  // 先按 start_date 降序排列所有活动（最新的在前）
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);

    // 检查日期是否有效
    if (isNaN(dateA.getTime())) {
      console.warn('Invalid date for event:', a);
      return 1;
    }
    if (isNaN(dateB.getTime())) {
      console.warn('Invalid date for event:', b);
      return -1;
    }

    return dateB.getTime() - dateA.getTime(); // 降序：最新的在前
  });

  console.log('First 3 sorted events:', sortedEvents.slice(0, 3).map(e => ({
    name: e.name,
    date: e.start_date,
    parsed: new Date(e.start_date).toISOString()
  })));

  // 然后按年份分组
  const grouped: { [key: string]: Event[] } = {};
  sortedEvents.forEach(event => {
    const date = new Date(event.start_date);
    const year = date.getFullYear().toString();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(event);
  });

  // 获取所有年份并按降序排列
  const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

  console.log('Years found:', sortedYears);

  // 构建结果，保持每个年份内的活动顺序（已经按日期降序）
  const result: { [key: string]: Event[] } = {};
  sortedYears.forEach(year => {
    result[year] = grouped[year];
  });

  return result;
}

// Group events by type (e.g., M3, Comiket, Reitaisai)
function groupEventsByType(events: Event[]) {
  const grouped: { [key: string]: Event[] } = {};
  events.forEach(event => {
    if (!grouped[event.type]) {
      grouped[event.type] = [];
    }
    grouped[event.type].push(event);
  });

  // Sort events within each type by date descending
  Object.keys(grouped).forEach(type => {
    grouped[type].sort((a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
  });

  return grouped;
}

// Format date range
function formatDateRange(startDate: string, endDate: string | null | undefined, locale: string) {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (!endDate || startDate === endDate) {
    return start.toLocaleDateString(locale, options);
  }

  const end = new Date(endDate);
  return `${start.toLocaleDateString(locale, options)} - ${end.toLocaleDateString(locale, options)}`;
}

export default function EventsPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("chronological");

  // 使用 API hook 获取数据
  const { data: events = [], isLoading, error } = useEvents();

  // 计算分组数据
  const eventsByYear = useMemo(() => groupEventsByYear(events), [events]);
  const eventsByType = useMemo(() => groupEventsByType(events), [events]);

  return (
    <ContentLayout title={t('events.title')}>
      <Card>
        <CardHeader>
          <CardTitle>{t('events.list')}</CardTitle>
          <CardDescription>{t('events.listDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 加载状态 */}
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">加载中...</p>
            </div>
          )}

          {/* 错误状态 */}
          {error && (
            <div className="border border-destructive rounded-lg p-4">
              <h3 className="font-semibold text-destructive">错误</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          )}

          {/* 数据展示 */}
          {!isLoading && !error && events.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              暂无活动数据
            </div>
          )}

          {!isLoading && !error && events.length > 0 && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="chronological" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('events.chronological')}
                </TabsTrigger>
                <TabsTrigger value="grouped" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  {t('events.grouped')}
                </TabsTrigger>
              </TabsList>

              {/* Chronological View */}
              <TabsContent value="chronological" className="space-y-6 mt-6">
                {Object.keys(eventsByYear)
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map(year => {
                    const yearEvents = eventsByYear[year];
                    return (
                  <div key={year} className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary border-b pb-2">
                      {year}
                    </h3>
                    <div className="space-y-2">
                      {yearEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          className="block p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-lg">
                                  {i18n.language === 'zh-CN' && event.translations?.ja?.name
                                    ? event.translations.ja.name
                                    : event.name}
                                </span>
                                <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                                  {event.slug}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDateRange(event.start_date, event.end_date, i18n.language)}
                                </span>
                                {event.location && <span>{event.location}</span>}
                              </div>
                            </div>
                            {event.total_works > 0 && (
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">
                                  {t('events.albums')}
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                  {event.total_works}
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                    );
                  })}
              </TabsContent>

              {/* Grouped by Type View */}
              <TabsContent value="grouped" className="space-y-6 mt-6">
                {Object.entries(eventsByType).map(([type, typeEvents]) => (
                  <div key={type} className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary border-b pb-2">
                      {type}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {typeEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          className="block p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">
                                {event.slug}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(event.start_date).getFullYear()}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {i18n.language === 'zh-CN' && event.translations?.ja?.name
                                ? event.translations.ja.name
                                : event.name}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {formatDateRange(event.start_date, event.end_date, i18n.language)}
                              </span>
                              {event.total_works > 0 && (
                                <span className="font-semibold text-primary">
                                  {event.total_works} {t('events.albums')}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
