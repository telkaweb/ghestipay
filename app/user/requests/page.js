"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Pagination from "@/shared/components/ui/Pagination";
import RequestCard from "../components/ui/RequestCard";
import CardSkeletonLoading from "@/shared/components/ui/CardSkeletonLoading";

import { useGetOrderList } from "@/shared/hooks/useInstallment";

const filters = ["همه", "تایید شده", "در حال بررسی", "رد شده"];

export default function RequestsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = filters.includes(searchParams.get("status"))
    ? searchParams.get("status")
    : "همه";

  const page = Number(searchParams.get("page")) || 1;

  const getOrderList = useGetOrderList({
    page,
    per_page: 10,
    sort: "desc",
  });

  const requests = getOrderList.data?.data?.data ?? [];

  const totalPages = getOrderList.data?.data?.last_page ?? 1;
  const currentPage = getOrderList.data?.data?.current_page ?? 1;

  const list = useMemo(() => {
    return requests.map((request) => ({
      id: request.id,
      date: new Date(request.created_at).toLocaleDateString("fa-IR"),
      installmentsTotal: `${Number(
        request?.amounts?.installment_total ?? 0
      ).toLocaleString("fa-IR")} تومان`,
      status:
        request.status === "rejected"
          ? "رد شده"
          : request.status === "approved"
          ? "تایید شده"
          : "در حال بررسی",
      itemsCount: Number(request?.invoice?.items?.length).toLocaleString("fa-IR") ?? 0,
    }));
  }, [requests]);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "همه") return list;

    return list.filter((request) => request.status === activeFilter);
  }, [activeFilter, list]);

  const returnQuery = `?page=${currentPage}&status=${encodeURIComponent(
    activeFilter
  )}`;

  const updateListParams = ({
    page = currentPage,
    status = activeFilter,
  }) => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("status", status);

    router.replace(`/user/requests?${params.toString()}`);
  };

  const handleFilterChange = (filter) => {
    updateListParams({
      page: 1,
      status: filter,
    });
  };

  if (getOrderList.isPending) {
    return (
      <div className="flex flex-col gap-3 px-4 pt-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardSkeletonLoading key={index} />
        ))}
      </div>
    );
  }

  if (getOrderList.isError) {
    return (
      <div className="px-4 pt-6">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          خطا در دریافت اطلاعات
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-4 pt-6">
      <div className="space-y-3">
        <h1 className="text-lg font-black text-gray-900">
          همه درخواست‌ها
        </h1>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={`shrink-0 rounded-xl px-3 py-2 text-[11px] font-bold transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-100"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {filteredRequests.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              returnQuery={returnQuery}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
          درخواستی برای این وضعیت وجود ندارد.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          updateListParams({
            page: newPage,
          });
        }}
      />
    </div>
  );
}