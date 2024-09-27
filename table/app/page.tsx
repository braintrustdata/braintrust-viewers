"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

export const dataMessageSchema = z.object({
  type: z.literal("data"),
  data: z.object({
    input: z.array(z.record(z.unknown())),
  }),
});

export const settingsMessageSchema = z.object({
  type: z.literal("settings"),
  settings: z.object({
    theme: z.enum(["light", "dark"]),
    readOnly: z.boolean(),
  }),
});

export const messageSchema = z.union([
  dataMessageSchema,
  settingsMessageSchema,
]);

export type Message = z.infer<typeof messageSchema>;

export default function TablePage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const message = messageSchema.parse(event.data);
        if (message.type === "data") {
          setData(message.data.input);
        }
      } catch (error) {
        console.error("Invalid message received:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const headers = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );

  if (data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {headers.map((header) => (
              <TableCell key={header}>
                {row[header as keyof typeof row]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
