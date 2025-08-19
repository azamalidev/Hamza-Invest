"use client";

import { DivideCircle, ChevronDown, ChevronUp, Download, ArrowUpRight, TrendingUp, FileText, Wallet, CreditCard, Banknote, Bitcoin, AlertCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Dividends() {
  const [expandedCorporation, setExpandedCorporation] = useState<number | null>(null);
  const [expandedHistoryItem, setExpandedHistoryItem] = useState<{ corpIndex: number; itemIndex: number } | null>(null);
  const [autoWithdrawal, setAutoWithdrawal] = useState(false);
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");

  // Sample data based on project requirements (replace with API data)
  const dividendData = {
    totalEarned: 1850.50,
    upcomingTotal: 625.00,
    corporations: [
      {
        id: 1,
        name: "Hamza Tech",
        totalEarned: 270.00,
        upcoming: 200.00,
        history: [
          { amount: 150.00, date: "2023-06-15", status: "Paid", paymentMethod: "Bank Transfer", transactionId: "TX123456", reinvested: false, taxDeducted: 15.00, notes: "Quarterly dividend" },
          { amount: 120.00, date: "2023-03-15", status: "Paid", paymentMethod: "Reinvested", transactionId: "TX654321", reinvested: true, taxDeducted: 12.00, notes: "Special dividend" },
        ],
        upcoming: [
          { amount: 200.00, date: "2023-09-15", status: "Scheduled", expectedYield: 1.2, notes: "Projected based on current holdings" },
        ],
      },
      {
        id: 2,
        name: "Hamza Energy",
        totalEarned: 475.00,
        upcoming: 300.00,
        history: [
          { amount: 250.00, date: "2023-06-10", status: "Paid", paymentMethod: "Bank Transfer", transactionId: "TX789012", reinvested: false, taxDeducted: 25.00, notes: "Annual dividend" },
          { amount: 225.00, date: "2023-03-10", status: "Paid", paymentMethod: "Reinvested", transactionId: "TX210987", reinvested: true, taxDeducted: 22.50, notes: "Interim dividend" },
        ],
        upcoming: [
          { amount: 300.00, date: "2023-09-10", status: "Scheduled", expectedYield: 1.5, notes: "Based on energy sector performance" },
        ],
      },
      {
        id: 3,
        name: "Hamza Real Estate",
        totalEarned: 75.00,
        upcoming: 100.00,
        history: [
          { amount: 75.00, date: "2023-06-20", status: "Paid", paymentMethod: "Bank Transfer", transactionId: "TX345678", reinvested: false, taxDeducted: 7.50, notes: "Rental income dividend" },
        ],
        upcoming: [
          { amount: 100.00, date: "2023-09-20", status: "Scheduled", expectedYield: 0.8, notes: "Projected from property valuations" },
        ],
      },
      {
        id: 4,
        name: "Hamza Logistics",
        totalEarned: 0.00,
        upcoming: 25.00,
        history: [],
        upcoming: [
          { amount: 25.00, date: "2023-09-05", status: "Scheduled", expectedYield: 0.5, notes: "Initial dividend payout" },
        ],
      },
    ],
  };

  const toggleCorporationExpand = (index: number) => {
    setExpandedCorporation(expandedCorporation === index ? null : index);
  };

  const toggleHistoryItemExpand = (corpIndex: number, itemIndex: number) => {
    const key = { corpIndex, itemIndex };
    setExpandedHistoryItem(expandedHistoryItem && expandedHistoryItem.corpIndex === corpIndex && expandedHistoryItem.itemIndex === itemIndex ? null : key);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black flex items-center">
              <DivideCircle className="w-6 h-6 mr-2 text-black" />
              Dividends
            </h2>
            <p className="text-gray-600 mt-1 text-sm">Track, manage, and withdraw your dividends across all corporations</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setAutoWithdrawal(!autoWithdrawal)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${autoWithdrawal ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}
            >
              Auto-Withdrawal: {autoWithdrawal ? "Enabled" : "Disabled"}
            </button>
            {autoWithdrawal && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setWithdrawalMethod("bank")}
                  className={`p-2 rounded-lg border transition-all ${withdrawalMethod === "bank" ? 'border-black bg-gray-100' : 'border-gray-300 hover:border-black'}`}
                  title="Bank Transfer"
                >
                  <Banknote className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={() => setWithdrawalMethod("card")}
                  className={`p-2 rounded-lg border transition-all ${withdrawalMethod === "card" ? 'border-black bg-gray-100' : 'border-gray-300 hover:border-black'}`}
                  title="Credit Card"
                >
                  <CreditCard className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={() => setWithdrawalMethod("crypto")}
                  className={`p-2 rounded-lg border transition-all ${withdrawalMethod === "crypto" ? 'border-black bg-gray-100' : 'border-gray-300 hover:border-black'}`}
                  title="Crypto Wallet"
                >
                  <Bitcoin className="w-5 h-5 text-black" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Total Dividends Earned */}
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Total Dividends Earned</p>
                <p className="text-2xl font-bold text-black mt-1">${dividendData.totalEarned.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Wallet className="w-5 h-5 text-black" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Year-to-Date (YTD) across all corporations</p>
          </div>

          {/* Upcoming Payouts */}
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Upcoming Payouts</p>
                <p className="text-2xl font-bold text-black mt-1">${dividendData.upcomingTotal.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Projected for next 30 days</p>
          </div>
        </div>

        {/* Dividend History per Corporation */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <DivideCircle className="w-5 h-5 mr-2 text-black" />
            Dividend Details by Corporation
          </h3>
          <div className="space-y-3">
            {dividendData.corporations.map((corp, index) => (
              <div key={corp.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <button
                  onClick={() => toggleCorporationExpand(index)}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="font-medium text-black">{corp.name.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-black">{corp.name}</p>
                      <p className="text-sm text-gray-600">Earned: ${corp.totalEarned.toFixed(2)} | Upcoming: ${corp.upcoming.toFixed(2)}</p>
                    </div>
                  </div>
                  {expandedCorporation === index ? (
                    <ChevronUp className="w-5 h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedCorporation === index ? "max-h-[800px]" : "max-h-0"}`}>
                  {/* History */}
                  <div className="p-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-black mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Payment History
                    </h4>
                    {corp.history.length > 0 ? (
                      <div className="space-y-3">
                        {corp.history.map((div, divIndex) => (
                          <div key={divIndex} className="border border-gray-200 rounded-md p-3">
                            <button
                              onClick={() => toggleHistoryItemExpand(index, divIndex)}
                              className="w-full flex justify-between items-center text-left"
                            >
                              <div>
                                <p className="text-sm font-medium text-black">{new Date(div.date).toLocaleDateString()} - ${div.amount.toFixed(2)}</p>
                                <p className="text-xs text-gray-600">{div.status} via {div.paymentMethod}</p>
                              </div>
                              {expandedHistoryItem && expandedHistoryItem.corpIndex === index && expandedHistoryItem.itemIndex === divIndex ? (
                                <ChevronUp className="w-4 h-4 text-black" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-black" />
                              )}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 mt-2 text-xs text-gray-600 ${expandedHistoryItem && expandedHistoryItem.corpIndex === index && expandedHistoryItem.itemIndex === divIndex ? "max-h-96" : "max-h-0"}`}>
                              <div className="grid grid-cols-2 gap-2">
                                <span>Transaction ID:</span>
                                <span className="font-medium text-black">{div.transactionId}</span>
                                <span>Reinvested:</span>
                                <span className="font-medium text-black">{div.reinvested ? "Yes" : "No"}</span>
                                <span>Tax Deducted:</span>
                                <span className="font-medium text-black">${div.taxDeducted.toFixed(2)}</span>
                                <span>Notes:</span>
                                <span className="font-medium text-black">{div.notes}</span>
                              </div>
                              <div className="flex justify-end mt-3 space-x-2">
                                <button className="px-3 py-1 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors text-xs flex items-center">
                                  <Download className="w-3 h-3 mr-1" />
                                  Receipt
                                </button>
                                <button className="px-3 py-1 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors text-xs flex items-center">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Report Issue
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No dividend history available</p>
                    )}
                  </div>
                  {/* Upcoming */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <h4 className="text-sm font-medium text-black mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Upcoming Payouts
                    </h4>
                    {corp.upcoming.length > 0 ? (
                      <div className="space-y-3">
                        {corp.upcoming.map((div, divIndex) => (
                          <div key={divIndex} className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-600">Date:</span>
                            <span className="text-black">{new Date(div.date).toLocaleDateString()}</span>
                            <span className="text-gray-600">Amount:</span>
                            <span className="text-black">${div.amount.toFixed(2)}</span>
                            <span className="text-gray-600">Status:</span>
                            <span className="text-black">{div.status}</span>
                            <span className="text-gray-600">Expected Yield:</span>
                            <span className="text-black">{div.expectedYield}%</span>
                            <span className="text-gray-600">Notes:</span>
                            <span className="text-black">{div.notes}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No upcoming payouts scheduled</p>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export Full History
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/withdraw"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Request Withdrawal
            </Link>
            <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Generate Dividend Report
            </button>
            <Link
              href="/support"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}