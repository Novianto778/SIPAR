// @ts-nocheck
import React from 'react';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination
} from 'react-table';
import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/solid';
import { Button, PageButton } from 'components/table/Button';
import { SortIcon, SortUpIcon, SortDownIcon } from 'components/table/Icon';
import { classNames } from 'components/table/Utils';
import moment from 'moment';
import 'moment/locale/id';
import { formatNama } from 'utils/formatNama';
import { formatUang } from 'utils/formatUang';
import Datepicker from 'components/form/DatePicker';
import { BiExport } from 'react-icons/bi';

// Define a default UI for filtering
function GlobalFilter(props) {
    const { preGlobalFilteredRows, globalFilter, setGlobalFilter } = props;
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">Search: </span>
            <input
                type="text"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </label>
    );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render }
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">{render('Header')}: </span>
            <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

export const ExportExcel = (props) => {
    return (
        <button
            className="flex gap-x-2 items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg- -600"
            onClick={props.handleExport}
        >
            <BiExport size={24} />
            <span>Export Pendapatan</span>
        </button>
    );
};

export function StatusPill({ value }) {
    const status = value ? value.toLowerCase() : 'unknown';

    return (
        <span
            className={classNames(
                'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
                status.startsWith('completed')
                    ? 'bg-green-100 text-green-800'
                    : null,
                status.startsWith('pending') ? 'bg-red-100 text-red-800' : null
            )}
        >
            {status}
        </span>
    );
}

interface Props {
    columns: any[];
    data: any[];
    startDate?: Date;
    endDate?: Date;
    setStartDate?: SetStateAction<Date>;
    setEndDate?: SetStateAction<Date>;
}

function Table({
    columns,
    data,
    startDate,
    endDate,
    setStartDate,
    setEndDate
}: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            autoResetPage: false
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
        // tableHooks
    );

    // Render the UI for your table

    return (
        <>
            <div className="sm:flex justify-between items-center sm:gap-x-2">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <div className="flex gap-x-2 items-center">
                    <Datepicker
                        selectedDate={startDate}
                        setSelectedDate={setStartDate}
                    />
                    <span className="text-xs">to:</span>
                    <Datepicker
                        selectedDate={endDate}
                        setSelectedDate={setEndDate}
                    />
                </div>

                <div>
                    {headerGroups.map((headerGroup) =>
                        headerGroup.headers.map((column) => {
                            return column.Filter ? (
                                <div className="mt-2 sm:mt-0" key={column.id}>
                                    {column.render('Filter')}
                                </div>
                            ) : null;
                        })
                    )}
                </div>
            </div>
            {/* table */}
            <div className="mt-4 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup, i) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                            key={i}
                                        >
                                            {headerGroup.headers
                                                .filter((col) => !col?.hidden)
                                                .map((column, i) => {
                                                    return (
                                                        // Add the sorting props to control sorting. For this example
                                                        // we can add them into the header props

                                                        <th
                                                            key={i}
                                                            scope="col"
                                                            className="group px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                {column.render(
                                                                    'Header'
                                                                )}
                                                                {/* Add a sort direction indicator */}
                                                                <span>
                                                                    {column.isSorted ? (
                                                                        column.isSortedDesc ? (
                                                                            <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                        ) : (
                                                                            <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                        )
                                                                    ) : (
                                                                        <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    );
                                                })}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200"
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                key={i}
                                                className={`${
                                                    i % 2 === 0 && 'bg-gray-200'
                                                }`}
                                                {...row.getRowProps()}
                                            >
                                                {row.cells.map((cell) => {
                                                    if (cell.column?.hidden) {
                                                        return null;
                                                    }

                                                    if (
                                                        cell.column.Header ===
                                                        'NO'
                                                    ) {
                                                        return (
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap"
                                                                key={
                                                                    cell.column
                                                                        .id
                                                                }
                                                            >
                                                                <div className="text-sm text-gray-900">
                                                                    {i +
                                                                        1 +
                                                                        state.pageSize *
                                                                            state.pageIndex}
                                                                </div>
                                                            </td>
                                                        );
                                                    }

                                                    if (
                                                        cell.column.Header ===
                                                        'Nama'
                                                    ) {
                                                        return (
                                                            <td
                                                                className="px-2 py-4 text-sm text-gray-900 whitespace-nowrap"
                                                                key={
                                                                    cell.column
                                                                        .id
                                                                }
                                                            >
                                                                {formatNama(
                                                                    cell.value
                                                                )}
                                                            </td>
                                                        );
                                                    }

                                                    if (
                                                        cell.column.tanggal ===
                                                        true
                                                    ) {
                                                        return (
                                                            <td
                                                                className="px-2 py-4 text-sm text-gray-900 whitespace-nowrap"
                                                                key={
                                                                    cell.column
                                                                        .id
                                                                }
                                                            >
                                                                {moment(
                                                                    cell.value
                                                                ).format(
                                                                    'DD MMMM YYYY'
                                                                )}
                                                            </td>
                                                        );
                                                    }

                                                    if (
                                                        cell.column?.uang ===
                                                        true
                                                    ) {
                                                        if (
                                                            cell.value === null
                                                        ) {
                                                            return (
                                                                <td
                                                                    className="px-2 py-4 text-sm text-gray-900 whitespace-nowrap"
                                                                    key={
                                                                        cell
                                                                            .column
                                                                            .id
                                                                    }
                                                                >
                                                                    -
                                                                </td>
                                                            );
                                                        } else {
                                                            return (
                                                                <td
                                                                    className="px-2 py-4 text-sm text-gray-900 whitespace-nowrap"
                                                                    key={
                                                                        cell
                                                                            .column
                                                                            .id
                                                                    }
                                                                >
                                                                    {formatUang(
                                                                        cell.value
                                                                    )}
                                                                </td>
                                                            );
                                                        }
                                                    }

                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-4 py-2 whitespace-nowrap"
                                                            role="cell"
                                                        >
                                                            {cell.column.Cell
                                                                .name ===
                                                            'defaultRenderer' ? (
                                                                <div className="text-sm text-gray-700">
                                                                    {cell.render(
                                                                        'Cell'
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                cell.render(
                                                                    'Cell'
                                                                )
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2 items-baseline">
                        <span className="text-sm text-gray-700">
                            Page{' '}
                            <span className="font-medium">
                                {state.pageIndex + 1}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium">
                                {pageOptions.length}
                            </span>
                        </span>
                        <label>
                            <span className="sr-only">Items Per Page</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={state.pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                        >
                            <PageButton
                                className="rounded-l-md"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
