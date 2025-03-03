// components/Pagination.tsx
import React from "react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pagesToShow: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
        // ページ数が7以下なら全て表示
        for (let i = 1; i <= totalPages; i++) {
            pagesToShow.push(i);
        }
    } else {
        // 常に1ページと最終ページは表示
        pagesToShow.push(1);

        // 現在ページが4より大きい場合、1と現在の前に省略記号を入れる
        if (currentPage > 4) {
            pagesToShow.push("ellipsis");
        }

        // 現在ページの前後1ページずつ表示（境界調整）
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            pagesToShow.push(i);
        }

        // 現在ページが最終ページ-3より小さい場合、中間に省略記号を追加
        if (currentPage < totalPages - 3) {
            pagesToShow.push("ellipsis");
        }

        pagesToShow.push(totalPages);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            {/* 最初ボタン */}
            <Button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                最初
            </Button>
            {/* 前へボタン */}
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                前へ
            </Button>
            {/* ページ番号 */}
            {pagesToShow.map((page, index) => {
                if (page === "ellipsis") {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2">
                            …
                        </span>
                    );
                }
                return (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        onClick={() => onPageChange(page as number)}
                    >
                        {page}
                    </Button>
                );
            })}
            {/* 次へボタン */}
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                次へ
            </Button>
            {/* 最後ボタン */}
            <Button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                最後
            </Button>
        </div>
    );
};

export default Pagination;
