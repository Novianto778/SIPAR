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
    <table className="w-full">
      <thead>
        <tr className="text-sm font-semibold text-black">
          <td className="py-4 border-b border-gray-700">Customer</td>
          <td className="py-4 border-b border-gray-700">Menu</td>
          <td className="py-4 border-b border-gray-700 text-right">
            Total Payment
          </td>
          <td className="py-4 border-b border-gray-700 text-center">Status</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: Order) => (
          <tr className="text-sm text-gray-700">
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
                className="flex justify-center py-1 w-24 font-medium capitalize rounded-full"
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
  );
};

export default TransactionReport;
