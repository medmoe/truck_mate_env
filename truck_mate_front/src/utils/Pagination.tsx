import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageClick: (page: number) => void;
}

export function Pagination ({currentPage, totalPages, onPageClick}: PaginationProps) {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);
    return (

        <nav className={styles.navBar}>
            <ul className="pagination">
                {pageNumbers.map((page:number) => (
                    <li key={page} className={page === currentPage? 'page-item active': 'page-item'}>
                        <p className="page-link" onClick={() => onPageClick(page)}>{page}</p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
