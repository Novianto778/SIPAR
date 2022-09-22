import React from 'react';

interface Props {
  orders: Order[];
}

interface Order {
  name: string;
  motor: string;
  total: string;
  status: string;
}

const TransactionReport: React.FC<Props> = ({ orders }) => {
  return (
    <div className="min-w-full overflow-x-auto">
      <div className="overflow-hidden min-w-[600px]">
        <table className="min-w-full">
          <thead>
            <tr className="text-sm font-semibold text-black">
              <td className="py-4 border-b border-gray-700">Customer</td>
              <td className="py-4 border-b border-gray-700">Menu</td>
              <td className="py-4 border-b border-gray-700 text-right">
                Total Payment
              </td>
              <td className="py-4 border-b border-gray-700 text-center">
                Status
              </td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order, index) => (
              <tr
                className="text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                key={index}
              >
                <td className="py-4">
                  <div className="flex gap-4 items-center">
                    <span> {order.name} </span>
                  </div>
                </td>
                <td className="py-4">{order.motor}</td>
                <td className="py-4 tabular-nums text-right font-medium">
                  {order.total}
                </td>
                <td className="py-4 flex justify-center">
                  <span
                    className={`flex justify-center py-1 w-24 font-medium capitalize rounded-full ${
                      order.status === 'completed' &&
                      'bg-accent-green text-white'
                    }  ${
                      order.status === 'pending' &&
                      'bg-accent-orange text-white'
                    }`}
                    // :className="{
                    //   'bg-accent-green/20 text-accent-green': order.status === 'completed',
                    //   'bg-accent-purple/20 text-accent-purple': order.status === 'preparing',
                    //   'bg-accent-orange/20 text-accent-green': order.status === 'pending',
                    // }"
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionReport;
