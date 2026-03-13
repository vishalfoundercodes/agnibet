import React,{useState} from "react";
import Pagination from "../ReusableComponent/Pagination";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
export default function AccountStatementTable({ data }) {
  const {t}=useTranslation()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    console.log("data:",data)
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginatedData = data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  return (
    <div>
      <div className="w-full overflow-x-auto hide-scrollbar">
        <table className="w-full border-collapse min-w-[600px] lg2:min-w-[400px]">
          <thead>
            <tr className="bg-red text-white text-ssm font-medium">
              <th className="px-3 py-4 text-left font-medium border-r border-b border-lightBorder rounded-tl-[10px]">
                {t(`DATE/TIME`)}
              </th>
              <th className="px-3 py-4 text-left font-medium border-r border-b border-lightBorder">
                {t(`CREDIT`)}
              </th>
              <th className="px-3 py-4 text-left font-medium border-r border-b border-lightBorder">
                {t(`DEBIT`)}
              </th>
              <th className="px-3 py-4 text-left font-medium border-r border-b border-lightBorder">
                {t(`BALANCE`)}
              </th>
              {/* Extra columns only visible on md+ screens */}
              <th className="px-3 py-2 text-left border-r border-b border-lightBorder rounded-tr-[10px]">
                {t(`DESCRIPTION`)}
              </th>
              {/* <th className="px-3 py-2 text-left border-r border-b border-lightBorder">
                ROUND
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, idx) => (
              <tr
                key={idx}
                className="text-ssm border-b border-gray-200 bg-red lg2:bg-red text-white"
              >
                <td className="px-3 py-2 whitespace-nowrap border-r border-b border-lightBorder">
                  {row.date_time}
                </td>
                <td className="px-3 py-2 border-r border-b border-lightBorder">
                  {row.credit}
                </td>
                <td
                  className={`px-3 py-2${
                    row.debit > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {row.debit}
                </td>
                <td className="px-3 py-2 border-r border-b border-lightBorder">
                  {row.balance}
                </td>
                {/* Extra columns for larger screen */}
                <td className="px-3 py-2 border-r border-b border-lightBorder">
                  {row.description}
                </td>
                {/* <td className="px-3 py-2 border-r border-b border-lightBorder">
                  {row.round}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(num) => {
          setRowsPerPage(num);
          setCurrentPage(1); // reset page
        }}
      />
    </div>
  );
}
