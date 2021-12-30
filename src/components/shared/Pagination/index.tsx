import { useState, useEffect, HtmlHTMLAttributes } from 'react'
import { useRouter } from 'next/router'
import StyledButton from '../StyledButton'
import PaginationService from '../../../util/PaginationService'

type PaginationProps = HtmlHTMLAttributes<HTMLDivElement> & {
  page: number;
  total_pages: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ page, total_pages, ...rest }) => {
  const [pagination, setPagination] = useState(['1'])
  const router = useRouter()

  useEffect(() => {
    setPagination(PaginationService.execute(total_pages, page));
  }, [total_pages])

  const handlePageClick = (page: string): void => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: page
      },
    })
  }

  const handleNextPageClick = (): void => {
    if (page < total_pages) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page + 1
        },
      })
    }
  }

  const handlePreviusPageClick = (): void => {
    if (page > 1) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page - 1
        },
      })
    }
  }

  return (
    <div className="pagination justify-content-end" {...rest}>
      <div className="pagination">
        <StyledButton 
          action="<" 
          type_button="blue"
          onClick={handlePreviusPageClick}
        />
        {
          pagination.map((item, index) => (
            item === '...' ? '...' : (
                <StyledButton 
                  key={index}
                  action={item} 
                  type_button="blue"
                  active={page === Number(item) }
                  onClick={() => handlePageClick(item)}
                />
              )
            ))
        }
        <StyledButton 
          action=">" 
          type_button="blue" 
          onClick={handleNextPageClick}
        />
      </div>
    </div>
  )
}

export default Pagination
