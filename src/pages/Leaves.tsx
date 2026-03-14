import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { mockLeaves, type LeaveRequest } from "@/data/mockData";

const statusColor = (status: string) => {
  switch (status) {
    case "Approved": return "bg-success/20 text-success hover:bg-success/30";
    case "Rejected": return "bg-destructive/20 text-destructive hover:bg-destructive/30";
    default: return "bg-warning/20 text-warning hover:bg-warning/30";
  }
};

export default function Leaves() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);
  const [filter, setFilter] = useState("All");
  const [confirmAction, setConfirmAction] = useState<{ leave: LeaveRequest; action: "Approved" | "Rejected" } | null>(null);
  const { toast } = useToast();

  const filtered = filter === "All" ? leaves : leaves.filter((l) => l.status === filter);

  const handleAction = () => {
    if (!confirmAction) return;
    setLeaves((prev) =>
      prev.map((l) => (l.id === confirmAction.leave.id ? { ...l, status: confirmAction.action } : l))
    );
    toast({
      title: `Leave ${confirmAction.action.toLowerCase()}`,
      description: `${confirmAction.leave.employeeName}'s leave has been ${confirmAction.action.toLowerCase()}.`,
    });
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
        <p className="text-muted-foreground">Review and manage employee leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {["Pending", "Approved", "Rejected"].map((status) => (
          <Card key={status}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold tabular-nums">{leaves.filter((l) => l.status === status).length}</div>
              <p className="text-sm text-muted-foreground">{status} Requests</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
          <CardTitle>Leave Requests</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Start</TableHead>
                  <TableHead className="hidden sm:table-cell">End</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{leave.employeeName}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {leave.startDate} → {leave.endDate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{leave.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums">{leave.startDate}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums">{leave.endDate}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColor(leave.status)}>{leave.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {leave.status === "Pending" ? (
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-success hover:text-success"
                            onClick={() => setConfirmAction({ leave, action: "Approved" })}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setConfirmAction({ leave, action: "Rejected" })}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No leave requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction?.action === "Approved" ? "Approve" : "Reject"} Leave Request
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to {confirmAction?.action === "Approved" ? "approve" : "reject"}{" "}
            <strong>{confirmAction?.leave.employeeName}</strong>'s {confirmAction?.leave.type.toLowerCase()} leave
            from {confirmAction?.leave.startDate} to {confirmAction?.leave.endDate}?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>Cancel</Button>
            <Button
              onClick={handleAction}
              className={confirmAction?.action === "Rejected" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              {confirmAction?.action === "Approved" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
