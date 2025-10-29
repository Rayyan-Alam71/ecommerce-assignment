import React from 'react'
import Navbar from './Navbar'

const Dashboard = ({ inventory_data }: any) => {
  return (
    <div className="min-h-screen max-w-screen bg-linear-to-r from-orange-100 via-white to-orange-100 p-8">
      <Navbar/>
      <div className="max-w-5xl mx-auto mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Inventory Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Total Products</span>
            <span className="text-2xl font-bold text-orange-600">{inventory_data.totalProducts}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Total Inventory</span>
            <span className="text-2xl font-bold text-orange-600">{inventory_data.totalInventory}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Low Stock Items</span>
            <span className="text-2xl font-bold text-amber-500">{inventory_data.lowStockItems}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Out of Stock</span>
            <span className="text-2xl font-bold text-red-500">{inventory_data.outOfStockItems}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {inventory_data.inventoryByCategory.map((cat: any) => (
              <div key={cat.category} className="bg-linear-to-r from-orange-200 via-orange-100 to-white rounded-lg p-4 flex flex-col items-center">
                <span className="text-md font-medium text-gray-700 mb-1">{cat.category}</span>
                <span className="text-lg font-bold text-orange-600">{cat.inventory}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right text-xs text-gray-400">
          Last updated: {new Date(inventory_data.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
