"use client";

import { users } from "../../lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function UsersPage() {
  const statusBadge = (s: string) =>
    s === "approved" ? (
      <Badge intent="success">Approved</Badge>
    ) : s === "pending" ? (
      <Badge intent="warning">Pending</Badge>
    ) : (
      <Badge intent="danger">Rejected</Badge>
    );

  return (
    <main className="min-h-screen p-8 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        👥 User Management & KYC
      </h1>

      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Registered Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH>Joined</TH>
                <TH>KYC Status</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {users.map((u) => (
                <TR key={u.id} className="hover:bg-gray-50">
                  <TD className="font-medium text-gray-800">{u.name}</TD>
                  <TD className="text-gray-700">{u.email}</TD>
                  <TD className="text-gray-600">{u.joinedAt}</TD>
                  <TD>{statusBadge(u.kycStatus)}</TD>
                  <TD>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="px-4 py-1.5 rounded-lg"
                        onClick={() => alert("View KYC docs for " + u.name)}
                      >
                        View Docs
                      </Button>
                      <Button
                        className="px-4 py-1.5 rounded-lg"
                        onClick={() => alert("Approve " + u.name)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-4 py-1.5 rounded-lg"
                        onClick={() => alert("Reject " + u.name)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
