import { useState } from "react";

const ordersData = [
  {
    id: "#1001",
    date: "20 Jun 2026",
    items: "Jharkraft Bag",
    total: 899,
    status: "Pending",
    details: {
      shippingAddress: "Flat 402, Golden Heights, Ranchi, Jharkhand",
      paymentMethod: "UPI (Google Pay)",
      estimatedDelivery: "25 Jun 2026",
      qty: 1,
      category: "Accessories"
    }
  },
  {
    id: "#1002",
    date: "18 Jun 2026",
    items: "Tribal Craft Box",
    total: 1299,
    status: "Shipped",
    details: {
      shippingAddress: "Sector 4, Bokaro Steel City, Jharkhand",
      paymentMethod: "Credit Card",
      estimatedDelivery: "22 Jun 2026",
      trackingNumber: "JK-90812739-IN",
      qty: 1,
      category: "Home Decor"
    }
  },
  {
    id: "#1003",
    date: "15 Jun 2026",
    items: "Eco Handmade Goods",
    total: 599,
    status: "Delivered",
    details: {
      shippingAddress: "Circular Road, Lalpur, Ranchi, Jharkhand",
      paymentMethod: "Cash on Delivery",
      estimatedDelivery: "18 Jun 2026",
      qty: 1,
      category: "Kitchenware"
    }
  },
  {
    id: "#1004",
    date: "12 Jun 2026",
    items: "Clay Pot Set",
    total: 799,
    status: "Returns",
    details: {
      shippingAddress: "Bariatu, Ranchi, Jharkhand",
      paymentMethod: "Net Banking",
      estimatedDelivery: "15 Jun 2026",
      returnStatus: "Refund Approved",
      qty: 1,
      category: "Pottery"
    }
  },
];

function MyOrder() {
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const tabs = ["All", "Pending", "Shipped", "Delivered", "Returns"];

  const filteredOrders =
    filter === "All"
      ? ordersData
      : ordersData.filter((o) => o.status === filter);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]";
      case "Shipped":
        return "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]";
      case "Pending":
        return "bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]";
      case "Returns":
        return "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#FBF7F2] text-[#1E1612] relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1E1612" }}
        >
          My Orders
        </h1>
        <p className="text-xs sm:text-sm text-[#4B5563]">
          Track status, manage return inquiries, and view receipts of your purchased handcrafts.
        </p>
      </div>

      {/* TABS FILTER: మొబైల్‌లో విరిగిపోకుండా పక్కకి స్క్రోల్ అయ్యేలా మార్చాము */}
      <div className="max-w-7xl mx-auto flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className="px-4 py-2 sm:px-5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 transform active:scale-95 shadow-sm inline-block"
            style={{
              borderColor: "#F0E6D8",
              backgroundColor: filter === tab ? "#8B3A2A" : "#FFFFFF",
              color: filter === tab ? "#FFFFFF" : "#1E1612",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ORDERS LIST CONTAINER */}
      <div className="max-w-7xl mx-auto">
        
        {/* 1. DESKTOP VIEW: పెద్ద స్క్రీన్స్‌లో టేబుల్ కనిపిస్తుంది (hidden md:block) */}
        <div className="hidden md:block bg-white rounded-[24px] shadow-lg border border-[#F0E6D8] hover:border-[#D4A24C] hover:shadow-2xl transition-all duration-500 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0E6D8] bg-[#FBF7F2]/50 text-[#4B5563] text-sm font-semibold uppercase tracking-wider">
                <th className="p-5 font-bold">Order #</th>
                <th className="p-5 font-bold">Date</th>
                <th className="p-5 font-bold">Items</th>
                <th className="p-5 font-bold">Total</th>
                <th className="p-5 font-bold">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E6D8]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-[#FBF7F2]/30 transition-colors duration-200 text-sm">
                    <td className="p-5 font-semibold text-[#8B3A2A]">{order.id}</td>
                    <td className="p-5 text-[#4B5563]">{order.date}</td>
                    <td className="p-5 font-medium text-[#1E1612]">{order.items}</td>
                    <td className="p-5 font-bold text-[#8B3A2A] text-base">₹{order.total}</td>
                    <td className="p-5">
                      <div className="flex items-center justify-between gap-4 max-w-xs">
                        <span className={`text-xs px-3.5 py-1.5 rounded-full font-bold border ${getStatusBadgeStyle(order.status)}`}>
                          {order.status}
                        </span>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#8B3A2A] font-bold text-sm tracking-wide hover:text-[#6D2D22] transition-colors duration-300 relative group"
                        >
                          View
                          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#8B3A2A] transition-all duration-300 group-hover:w-full" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-[#4B5563] font-medium">
                    No orders found under the "{filter}" filter category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 2. MOBILE VIEW: మొబైల్‌లో అందమైన కార్డ్స్ కనిపిస్తాయి (md:hidden) */}
        <div className="block md:hidden space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => (
              <div 
                key={i} 
                className="bg-white p-5 rounded-[20px] shadow-md border border-[#F0E6D8] active:border-[#D4A24C] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#8B3A2A] text-base">{order.id}</span>
                  <span className={`text-[11px] px-3 py-1 rounded-full font-bold border ${getStatusBadgeStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-1 mb-4">
                  <p className="font-semibold text-[#1E1612] text-sm">{order.items}</p>
                  <p className="text-xs text-[#4B5563]">Ordered on: {order.date}</p>
                </div>

                <div className="flex justify-between items-center border-t border-[#F0E6D8]/60 pt-3">
                  <div>
                    <span className="text-[11px] text-[#4B5563] block">Total Amount</span>
                    <span className="font-bold text-[#8B3A2A] text-base">₹{order.total}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-[#8B3A2A] text-white text-xs font-bold rounded-xl active:scale-95 transition-transform"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 text-center rounded-[20px] border border-[#F0E6D8] text-[#4B5563] text-sm font-medium">
              No orders found under the "{filter}" filter category.
            </div>
          )}
        </div>

      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div 
            className="bg-white rounded-t-[24px] sm:rounded-[24px] max-w-lg w-full shadow-2xl border border-[#F0E6D8] overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-[#FBF7F2] p-5 sm:p-6 border-b border-[#F0E6D8] flex justify-between items-center shrink-0">
              <div>
                <h3 
                  className="text-xl sm:text-2xl font-bold text-[#1E1612]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Order Details
                </h3>
                <p className="text-xs text-[#4B5563] mt-1">ID: {selectedOrder.id} • Placed on {selectedOrder.date}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#F0E6D8] text-[#4B5563] hover:text-[#8B3A2A] transition-colors font-bold text-sm flex items-center justify-center shadow-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: మొబైల్‌లో స్క్రోలింగ్ కోసం overflow-y-auto యాడ్ చేసాం */}
            <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 text-xs sm:text-sm text-[#1E1612] overflow-y-auto">
              
              {/* Product Info */}
              <div className="flex justify-between items-center bg-[#FBF7F2] p-4 rounded-xl border border-[#F0E6D8]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4B5563]">{selectedOrder.details.category}</p>
                  <p className="font-bold text-sm sm:text-base text-[#1E1612] mt-0.5">{selectedOrder.items}</p>
                  <p className="text-[11px] text-[#4B5563] mt-0.5">Qty: {selectedOrder.details.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-medium text-[#4B5563]">Total Paid</p>
                  <p className="text-lg sm:text-xl font-black text-[#8B3A2A]">₹{selectedOrder.total}</p>
                </div>
              </div>

              {/* Status Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">Status</span>
                  <span className={`inline-block text-[11px] px-3 py-1 rounded-full font-bold border ${getStatusBadgeStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">Est. Delivery</span>
                  <p className="font-semibold text-xs sm:text-sm text-[#1E1612]">{selectedOrder.details.estimatedDelivery}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">Shipping Address</span>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed bg-[#FBF7F2]/40 p-3 rounded-lg border border-[#F0E6D8]/50">
                  {selectedOrder.details.shippingAddress}
                </p>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#F0E6D8] pt-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">Payment Method</span>
                  <p className="font-medium text-xs sm:text-sm text-[#1E1612]">{selectedOrder.details.paymentMethod}</p>
                </div>
                {selectedOrder.details.trackingNumber && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">Tracking ID</span>
                    <p className="font-mono text-xs font-bold text-[#8B3A2A]">{selectedOrder.details.trackingNumber}</p>
                  </div>
                )}
                {selectedOrder.details.returnStatus && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">Return Update</span>
                    <p className="font-semibold text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-2 py-0.5 inline-block">{selectedOrder.details.returnStatus}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FBF7F2] px-5 py-4 border-t border-[#F0E6D8] flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#8B3A2A] hover:bg-[#6D2D22] text-white font-semibold rounded-xl text-xs transition-all duration-300 shadow-md active:scale-95"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MyOrder;