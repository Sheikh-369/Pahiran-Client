function AdminDashboard() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Ecommerce Admin Dashboard</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    body {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n    }\n    \n    html, body {\n      height: 100%;\n      overflow-x: hidden;\n    }\n\n    .chart-bar {\n      transition: all 0.3s ease;\n    }\n\n    .chart-bar:hover {\n      opacity: 0.8;\n    }\n\n    .stat-card {\n      transition: transform 0.2s ease, box-shadow 0.2s ease;\n    }\n\n    .stat-card:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);\n    }\n\n    .table-row {\n      transition: background-color 0.2s ease;\n    }\n\n    .table-row:hover {\n      background-color: #f9fafb;\n    }\n  ",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "@view-transition { navigation: auto; }",
        }}
      />
      <div className="min-h-full flex">

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          
          <main className="flex-1 px-6 py-6 overflow-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Revenue Card */}
              <div className="stat-card bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p
                    id="revenue-label"
                    className="text-sm font-medium text-gray-600"
                  >
                    Total Revenue
                  </p>
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">$54,239</p>
                <p className="text-sm text-green-600 mt-2">
                  ↑ 12.5% from last month
                </p>
              </div>
              {/* Orders Card */}
              <div className="stat-card bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p
                    id="orders-label"
                    className="text-sm font-medium text-gray-600"
                  >
                    Total Orders
                  </p>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">1,429</p>
                <p className="text-sm text-green-600 mt-2">
                  ↑ 8.2% from last month
                </p>
              </div>
              {/* Customers Card */}
              <div className="stat-card bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p
                    id="customers-label"
                    className="text-sm font-medium text-gray-600"
                  >
                    Active Customers
                  </p>
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">8,542</p>
                <p className="text-sm text-green-600 mt-2">
                  ↑ 5.7% from last month
                </p>
              </div>
              {/* Products Card */}
              <div className="stat-card bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p
                    id="products-label"
                    className="text-sm font-medium text-gray-600"
                  >
                    Products
                  </p>
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">342</p>
                <p className="text-sm text-gray-600 mt-2">23 low stock items</p>
              </div>
            </div>
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Revenue Overview
                </h3>
                <div className="flex items-end justify-between h-64 gap-2">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="chart-bar w-full bg-indigo-600 rounded-t"
                      style={{ height: "60%" }}
                    />
                    <span className="text-xs text-gray-600 mt-2">Jan</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="chart-bar w-full bg-indigo-600 rounded-t"
                      style={{ height: "75%" }}
                    />
                    <span className="text-xs text-gray-600 mt-2">Feb</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="chart-bar w-full bg-indigo-600 rounded-t"
                      style={{ height: "55%" }}
                    />
                    <span className="text-xs text-gray-600 mt-2">Mar</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="chart-bar w-full bg-indigo-600 rounded-t"
                      style={{ height: "85%" }}
                    />
                    <span className="text-xs text-gray-600 mt-2">Apr</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="chart-bar w-full bg-indigo-600 rounded-t"
                      style={{ height: "70%" }}
                    />
                    <span className="text-xs text-gray-600 mt-2">May</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="chart-bar w-full bg-indigo-600 rounded-t"
                      style={{ height: "95%" }}
                    />
                    <span className="text-xs text-gray-600 mt-2">Jun</span>
                  </div>
                </div>
              </div>
              {/* Top Products */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Products
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">
                        📱
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Wireless Earbuds Pro
                        </p>
                        <p className="text-sm text-gray-600">324 sold</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      $12,960
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">
                        ⌚
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Smart Watch Series 5
                        </p>
                        <p className="text-sm text-gray-600">287 sold</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      $28,700
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">
                        💻
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Laptop Stand Aluminum
                        </p>
                        <p className="text-sm text-gray-600">256 sold</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      $7,680
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">
                        🎧
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          USB-C Hub 7-in-1
                        </p>
                        <p className="text-sm text-gray-600">198 sold</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      $5,940
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Orders Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Orders
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #ORD-2847
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Sarah Johnson
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Wireless Earbuds Pro
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $89.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Jun 15, 2024
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #ORD-2846
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Michael Chen
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Smart Watch Series 5
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $299.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Shipped
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Jun 15, 2024
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #ORD-2845
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Emma Williams
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Laptop Stand Aluminum
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $49.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Jun 14, 2024
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #ORD-2844
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        James Brown
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        USB-C Hub 7-in-1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $34.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Jun 14, 2024
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #ORD-2843
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Lisa Anderson
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Wireless Earbuds Pro
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $89.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Shipped
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Jun 13, 2024
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
