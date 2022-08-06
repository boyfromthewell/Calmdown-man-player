import React, { memo } from "react";
import { Button } from "react-bootstrap";
// 페이지네이션 컨트롤
const Pagination = memo(({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <div className="page-btn">
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            variant="outline-primary"
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </Button>
        ))}
    </div>
  );
});

export default Pagination;
