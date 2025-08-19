"use client";

import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  PieChart,
  Info,
  CreditCard,
  Banknote,
  Bitcoin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  History,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function TradeComponent() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCorp, setSelectedCorp] = useState("HTECH");
  const [quantity, setQuantity] = useState(10);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "crypto">("bank");
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [priceHistory, setPriceHistory] = useState<{time: string, price: number}[]>([]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate price changes
      if (Math.random() > 0.7) {
        const newPriceHistory = [...priceHistory];
        if (newPriceHistory.length >= 10) newPriceHistory.shift();
        newPriceHistory.push({
          time: new Date().toLocaleTimeString(),
          price: corporations.find(c => c.symbol === selectedCorp)!.price * (1 + (Math.random() * 0.02 - 0.01))
        });
        setPriceHistory(newPriceHistory);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [priceHistory, selectedCorp]);

  const corporations = [
    { symbol: "HTECH", name: "Hamza Tech", price: 124.5, change: 2.4 },
    { symbol: "HENE", name: "Hamza Energy", price: 58.75, change: -0.8 },
    { symbol: "HRE", name: "Hamza Real Estate", price: 92.3, change: 1.2 },
    { symbol: "HLOG", name: "Hamza Logistics", price: 45.6, change: 3.1 },
  ];

  const portfolio = {
    cashBalance: 12500.75,
    holdings: [
      { symbol: "HTECH", shares: 50, avgPrice: 118.25 },
      { symbol: "HENE", shares: 120, avgPrice: 56.4 },
    ],
  };

  const transactionHistory = [
    {
      date: "2023-07-15",
      type: "Buy",
      symbol: "HTECH",
      quantity: 20,
      price: 120.0,
      total: 2400.0,
      status: "Completed"
    },
    {
      date: "2023-06-10",
      type: "Sell",
      symbol: "HENE",
      quantity: 10,
      price: 115.5,
      total: 1155.0,
      status: "Completed"
    },
    {
      date: "2023-05-20",
      type: "Buy",
      symbol: "HRE",
      quantity: 15,
      price: 118.75,
      total: 1781.25,
      status: "Completed"
    },
    {
      date: "2023-05-15",
      type: "Buy",
      symbol: "HTECH",
      quantity: 5,
      price: 117.5,
      total: 587.5,
      status: "Completed"
    },
    {
      date: "2023-05-10",
      type: "Sell",
      symbol: "HLOG",
      quantity: 30,
      price: 44.2,
      total: 1326.0,
      status: "Completed"
    },
  ];

  const selectedCorpData = corporations.find(
    (corp) => corp.symbol === selectedCorp
  );
  const holdingData = portfolio.holdings.find(
    (item) => item.symbol === selectedCorp
  );
  const availableShares = holdingData ? holdingData.shares : 0;
  const totalValue = quantity * (selectedCorpData?.price || 0);
  const canSell = activeTab === "sell" && quantity <= availableShares;
  const canBuy = activeTab === "buy" && totalValue <= portfolio.cashBalance;

  const handlePlaceOrder = () => {
    if ((activeTab === "sell" && !canSell) || (activeTab === "buy" && !canBuy)) {
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-black flex items-center">
              <ArrowUpDown className="w-7 h-7 mr-2 text-black" />
              Trade Shares
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Buy and sell shares in Hamza Waheed corporations with real-time
              prices
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full mt-4 md:mt-0 shadow-inner">
            {["buy", "sell"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "buy" | "sell")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
              >
                {tab === "buy" ? "Buy" : "Sell"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Corporations */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-black mb-4">
              Corporations
            </h3>
            <div className="space-y-3">
              {corporations.map((corp) => (
                <button
                  key={corp.symbol}
                  onClick={() => setSelectedCorp(corp.symbol)}
                  className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all ${
                    selectedCorp === corp.symbol
                      ? "border-black bg-gray-50 shadow-sm"
                      : "border-gray-200 hover:border-black hover:shadow-sm"
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium text-black">{corp.name}</p>
                    <p className="text-sm text-gray-500">{corp.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">
                      ${corp.price.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs flex items-center justify-end ${
                        corp.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {corp.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(corp.change)}%
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Portfolio Summary */}
            <div className="mt-6 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-black mb-3 flex items-center">
                <PieChart className="w-4 h-4 mr-2 text-black" />
                Portfolio Overview
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cash Balance:</span>
                  <span className="font-semibold text-black">
                    ${portfolio.cashBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
                {holdingData && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {selectedCorpData?.name} Shares:
                      </span>
                      <span className="font-semibold text-black">
                        {holdingData.shares}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Price:</span>
                      <span className="font-semibold text-black">
                        ${holdingData.avgPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Value:</span>
                      <span className="font-semibold text-black">
                        ${(holdingData.shares * (selectedCorpData?.price || 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit/Loss:</span>
                      <span className={`font-semibold ${
                        (selectedCorpData?.price || 0) >= holdingData.avgPrice 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}>
                        {((selectedCorpData?.price || 0) >= holdingData.avgPrice ? "+" : "-")}
                        ${(Math.abs(
                          (selectedCorpData?.price || 0) - holdingData.avgPrice
                        ) * holdingData.shares).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-black mb-4">
                {activeTab === "buy" ? "Buy" : "Sell"} Order
              </h3>
              
              {/* Selected Corporation Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-black">{selectedCorpData?.name}</h4>
                    <p className="text-gray-500 text-sm">{selectedCorpData?.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-black">
                      ${selectedCorpData?.price.toFixed(2)}
                    </p>
                    <p className={`text-sm flex items-center justify-end ${
                      selectedCorpData?.change && selectedCorpData.change >= 0 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {selectedCorpData?.change && selectedCorpData.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {selectedCorpData?.change && Math.abs(selectedCorpData.change)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  As of {formatTime(currentTime)} - {formatDate(currentTime)}
                </div>
              </div>

              {/* Order Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Type
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setOrderType("market")}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                      orderType === "market"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    Market Order
                  </button>
                  <button
                    onClick={() => setOrderType("limit")}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                      orderType === "limit"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    Limit Order
                  </button>
                </div>
                {orderType === "limit" && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Limit Price ($)
                    </label>
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      placeholder="Enter limit price"
                      step="0.01"
                      min="0.01"
                    />
                  </div>
                )}
              </div>

              {/* Quantity Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 p-2 border-t border-b border-gray-300 text-center"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                {activeTab === "sell" && (
                  <div className="mt-1 text-xs text-gray-500">
                    Available: {availableShares} shares
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium flex items-center justify-center ${
                      paymentMethod === "bank"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <Banknote className="w-4 h-4 mr-2" />
                    Bank Transfer
                  </button>
                  <button
                    onClick={() => setPaymentMethod("crypto")}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium flex items-center justify-center ${
                      paymentMethod === "crypto"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <Bitcoin className="w-4 h-4 mr-2" />
                    Crypto
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-black mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per share:</span>
                    <span className="font-medium text-black">
                      ${selectedCorpData?.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium text-black">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Total:</span>
                    <span className="font-medium text-black">
                      ${totalValue.toFixed(2)}
                    </span>
                  </div>
                  {orderType === "limit" && limitPrice && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Limit Price:</span>
                      <span className="font-medium text-black">
                        ${parseFloat(limitPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={
                  (activeTab === "sell" && !canSell) || 
                  (activeTab === "buy" && !canBuy) ||
                  (orderType === "limit" && !limitPrice)
                }
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  (activeTab === "sell" && !canSell) || 
                  (activeTab === "buy" && !canBuy) ||
                  (orderType === "limit" && !limitPrice)
                    ? "bg-gray-400 cursor-not-allowed"
                    : activeTab === "buy"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {activeTab === "buy" ? "Place Buy Order" : "Place Sell Order"}
              </button>

              {/* Validation Messages */}
              {activeTab === "sell" && quantity > availableShares && (
                <div className="mt-3 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Not enough shares available
                </div>
              )}
              {activeTab === "buy" && totalValue > portfolio.cashBalance && (
                <div className="mt-3 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Insufficient funds
                </div>
              )}
              {orderPlaced && (
                <div className="mt-3 text-sm text-green-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Order placed successfully!
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Market Info + History */}
          <div className="lg:col-span-1">
            {/* Price History Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-black" />
                Price History
              </h3>
              <div className="h-48 bg-gray-50 rounded-lg p-4 flex items-end">
                {priceHistory.length > 0 ? (
                  <div className="flex h-full w-full items-end space-x-1">
                    {priceHistory.map((item, index) => (
                      <div 
                        key={index}
                        className="flex-1 flex flex-col items-center"
                        style={{ height: `${(item.price / Math.max(...priceHistory.map(p => p.price)) * 100)}%` }}
                      >
                        <div 
                          className={`w-full ${
                            index === priceHistory.length - 1 
                              ? "bg-black" 
                              : "bg-gray-300"
                          } rounded-t-sm`}
                        />
                        {index % 2 === 0 && (
                          <span className="text-xs text-gray-500 mt-1">
                            {item.time.split(':').slice(0, 2).join(':')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center w-full text-gray-500">
                    No price history available yet
                  </div>
                )}
              </div>
              <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                <span>Last 10 updates</span>
                <span>Current: ${selectedCorpData?.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black flex items-center">
                  <History className="w-5 h-5 mr-2 text-black" />
                  Transaction History
                </h3>
                <button
                  onClick={() => setExpandedHistory(!expandedHistory)}
                  className="text-sm text-gray-600 hover:text-black flex items-center"
                >
                  {expandedHistory ? "Show Less" : "Show More"}
                  {expandedHistory ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
              <div className="space-y-3">
                {(expandedHistory ? transactionHistory : transactionHistory.slice(0, 3)).map((txn, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black">
                          {txn.type} {txn.symbol}
                        </p>
                        <p className="text-xs text-gray-500">{txn.date}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            txn.type === "Buy" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {txn.type === "Buy" ? "+" : "-"}${txn.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {txn.quantity} shares @ ${txn.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span className="text-gray-500">{txn.status}</span>
                      <button className="text-black hover:underline flex items-center">
                        Details <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-black mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <CreditCard className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Deposit Funds</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <Banknote className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Withdraw</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <PieChart className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Portfolio</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <Info className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}