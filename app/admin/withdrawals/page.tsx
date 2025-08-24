"use client";

import { withdrawals, users } from "../../lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";

export default function WithdrawalsPage() {
  return (
    <main className="min-h-screen p-8 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        💳 Withdrawal Requests
      </h1>

      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Pending & Processed Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>User</TH>
                <TH>Amount</TH>
                <TH>Method</TH>
                <TH>Status</TH>
                <TH>Requested</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {withdrawals.map((w) => {
                const user = users.find((u) => u.id === w.userId);
                return (
                  <TR key={w.id} className="hover:bg-gray-50">
                    <TD>{user?.name}</TD>
                    <TD className="text-gray-700 font-medium">
                      PKR {w.amount.toLocaleString()}
                    </TD>
                    <TD className="capitalize">{w.method}</TD>
                    <TD
                      className={`capitalize font-medium ${
                        w.status === "approved"
                          ? "text-green-600"
                          : w.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {w.status}
                    </TD>
                    <TD>{w.requestedAt}</TD>
                    <TD className="text-right flex gap-4 justify-end">
                      <Button
                        onClick={() => alert("Approve")}
                        className="px-4 py-1.5 rounded-lg"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => alert("Reject")}
                        className="px-4 py-1.5 rounded-lg"
                      >
                        Reject
                      </Button>
                    </TD>
                  </TR>
                );
              })}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
